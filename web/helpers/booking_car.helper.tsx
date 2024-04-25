import axios from "axios";
import { BookingErrorInterface, BookingInterface } from "../interfaces/booking.interface";
import { ToastError, ToastSuccess } from "../components/Common/Toast/Toast";
import { setLocale } from "./locale.helper";
import { CarInterface } from "../interfaces/car.interface";
import { setCars } from "../features/cars/carsSlice";
import { getCars } from "./car.helper";


export async function chechData(data: BookingInterface, errData: BookingErrorInterface,
    dispatch: any, setIsLoading: (e: boolean) => void, setError: (e: any) => void, router: any) {
    setIsLoading(true);

    setError(errData);

    if (data.clientName && data.phone && data.startDate && data.finishDate &&  data.car.counter > 0) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        })
            .then(function (response) {
                bookingCar(data, setIsLoading, response.data.jwt, router);
                changeCarStatus(data.car, dispatch, response.data.jwt, router);
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

        if (!data.startDate || !data.finishDate) {
            ToastError(setLocale(router.locale).error_data);
        }

        if (!data.startDate) {
            errData.errStart = true;
        }

        if (!data.finishDate) {
            errData.errFinish = true;
        }
    }
}

export async function bookingCar(data: BookingInterface, setIsLoading: (e: boolean) => void, token: string, router: any) {
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/rented-cars', {
        data: {
            clientName: data.clientName,
            startDate: data.startDate,
            finishDate: data.finishDate,
            phone: data.phone,
            car: data.car.id,
            status: 'booked',
        }
    }, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(function () {
            setIsLoading(false);
            ToastSuccess(setLocale(router.locale).car_reserved);
        })
        .catch(function (error) {
            console.log("Booking error: " + error);
            ToastError(setLocale(router.locale).booking_error);
    });
}

export async function changeCarStatus(car: CarInterface, dispatch: any, token: string, router: any) {
    await axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/cars/' + car.id, {
        data: {
            name: car.name,
            description: car.description,
            images: car.images.map(img => img.id),
            price: car.price,
            counter: car.counter - 1,
        }
    }, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
    })
        .then(function () {
            getCars(dispatch, router.locale);
        })
        .catch(function (error) {
            console.log("Change status error: " + error);
            ToastError(setLocale(router.locale).booking_error);
        });
}
