import axios from "axios";
import { BookingErrorInterface, BookingInterface } from "../interfaces/booking.interface";
import { ToastError, ToastSuccess } from "../components/Common/Toast/Toast";
import { setLocale } from "./locale.helper";
import { DatesInterface } from "../interfaces/dates.interface";
import { getDateInput } from "./date.helper";


export async function checkData(data: BookingInterface, errData: BookingErrorInterface, dates: DatesInterface,
    setIsLoading: (e: boolean) => void, setError: (e: any) => void, router: any) {
    setIsLoading(true);

    setError(errData);

    if (data.clientName && data.phone &&  data.car.counter > 0) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        })
            .then(function (response) {
                bookingCar(data, dates, setIsLoading, response.data.jwt, router);
            })
            .catch(function (error) {
                console.log("Booking error: " + error);
                ToastError(setLocale(router.locale).booking_error);
        });
    } else {
        setIsLoading(false);
        
        if (!data.clientName) {
            errData.errName = true;
            ToastError(setLocale(router.locale).error_name);
        }

        if (!data.phone) {
            errData.errPhone = true;
            ToastError(setLocale(router.locale).error_phone);
        }        
    }
}

export async function bookingCar(data: BookingInterface, dates: DatesInterface,
    setIsLoading: (e: boolean) => void, token: string, router: any) {
    if (!data.startDate) {
        data.startDate = getDateInput('time');
    }

    if (!data.finishDate) {
        data.startDate = getDateInput('time');
    }

    console.log(data.startDate)

    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/rented-cars', {
        data: {
            clientName: data.clientName,
            startDate: dates.startDate + 'T' + data.startDate,
            finishDate: dates.finishDate + 'T' + data.finishDate,
            phone: data.phone,
            car: data.car.id,
            status: 'booked',
            startLocation: dates.startLocation,
            finishLocation: dates.finishLocation,
        }
    }, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(function () {
            // changeCarStatus(data.car, dates, dispatch, token, router);

            setIsLoading(false);
            ToastSuccess(setLocale(router.locale).car_reserved);
        })
        .catch(function (error) {
            console.log("Booking error: " + error);
            ToastError(setLocale(router.locale).booking_error);
            setIsLoading(false);
    });
}

// export async function changeCarStatus(car: CarInterface, dates: DatesInterface, dispatch: any, token: string, router: any) {
//     await axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/cars/' + car.id, {
//         data: {
//             counter: car.counter - 1,
//         }
//     }, {
//         headers: {
//           'Authorization': 'Bearer ' + token,
//           'Content-Type': 'application/json'
//         }
//     })
//         .then(function () {
//             getCars(dispatch, dates, router.locale);
//         })
//         .catch(function (error) {
//             console.log("Change status error: " + error);
//             ToastError(setLocale(router.locale).booking_error);
//         });
// }
