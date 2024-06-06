import axios from "axios";
import { BookingErrorInterface, BookingInterface } from "../interfaces/booking.interface";
import { ToastError, ToastSuccess } from "../components/Common/Toast/Toast";
import { setLocale } from "./locale.helper";
import { DatesInterface } from "../interfaces/dates.interface";
import { getDateInput } from "./date.helper";


export async function checkData(data: BookingInterface, errData: BookingErrorInterface, dates: DatesInterface,
    isStart: boolean, freeCarsCounter: number, setIsLoading: (e: boolean) => void, setError: (e: any) => void,
    setFreeCarsCounter: (e: number) => void, router: any) {
    setIsLoading(true);

    setError(errData);

    if (data.clientName && data.phone && data.car.counter > 0 && (data.startLocation?.location_code || !isStart)
        && (data.finishLocation?.location_code || !isStart) && freeCarsCounter > 0) {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/local', {
            identifier: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        })
            .then(function (response) {
                bookingCar(data, dates, isStart, freeCarsCounter, setIsLoading, setFreeCarsCounter, response.data.jwt, router);
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
        
        if (!data.startLocation?.location_code && isStart) {
            errData.errStartLocation = true;
        } 

        if (!data.finishLocation?.location_code && isStart) {
            errData.errFinishLocation = true;
        }

        if ((!data.startLocation?.location_code && isStart) || (!data.finishLocation?.location_code && isStart)) {
            ToastError(setLocale(router.locale).error_location);
        } 

        if (freeCarsCounter === 0 && isStart) {
            ToastError(setLocale(router.locale).error_counter);
        }
    }
}

export async function bookingCar(data: BookingInterface, dates: DatesInterface, isStart: boolean, freeCarsCounter: number,
    setIsLoading: (e: boolean) => void, setFreeCarsCounter: (e: number) => void, token: string, router: any) {
    if (!data.startDate && !isStart) {
        data.startDate = getDateInput('time');
    } else if (!data.startDate && isStart) {
        data.startDate = getDateInput('datetime-local');
    }

    if (!data.finishDate && !isStart) {
        data.finishDate = getDateInput('time');
    } else if (!data.finishDate && isStart) {
        data.finishDate = getDateInput('datetime-local');
    }

    await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/rented-cars', {
        data: {
            clientName: data.clientName,
            startDate: isStart ? data.startDate : dates.startDate + 'T' + data.startDate,
            finishDate: isStart ? data.finishDate : dates.finishDate + 'T' + data.finishDate,
            phone: data.phone,
            car: data.car.id,
            status: 'booked',
            startLocation: isStart ? data.startLocation?.location_code : dates.startLocation,
            finishLocation: isStart ? data.finishLocation?.location_code : dates.finishLocation,
        }
    }, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(function () {
            setFreeCarsCounter(freeCarsCounter - 1);

            setIsLoading(false);
            ToastSuccess(setLocale(router.locale).car_reserved);
        })
        .catch(function (error) {
            console.log("Booking error: " + error);
            ToastError(setLocale(router.locale).booking_error);
            setIsLoading(false);
    });
}
