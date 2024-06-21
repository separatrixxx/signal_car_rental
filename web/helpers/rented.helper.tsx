import axios, { AxiosResponse } from "axios";
import { CarCounterInterface, CarRentedData } from "../interfaces/car.interface";
import { setRented } from "../features/rented/rentedSlice";
import { getDate } from '../helpers/date.helper';


export async function getRented(dispatch: any) {
    const { data : response }: AxiosResponse<CarRentedData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
        '/api/rented-cars?pagination%5Blimit%5D=1000000&populate=car');
    
    dispatch(setRented(response.data));
}

export function checkAvailableCars(checkData: CarCounterInterface, setFreeCarsCounter: (e: number) => void) {
    let n = 0;

    const startDate = checkData.isStart ? (checkData.startDatetime ? new Date(checkData.startDatetime)
        : new Date(getDate(true))) : new Date(checkData.dates.startDate);
    const finishDate = checkData.isStart ? (checkData.finishDatetime ? new Date(checkData.finishDatetime)
        : new Date(getDate(true))) : new Date(checkData.dates.finishDate);

    for (let cr of checkData.rented) {
        const startDateRented = new Date(cr.start_date);
        const finishDateRented = new Date(cr.finish_date);

        if (startDate.setHours(0, 0, 0, 0) <= finishDateRented.setHours(0, 0, 0, 0)
            && finishDate.setHours(0, 0, 0, 0) >= startDateRented.setHours(0, 0, 0, 0)) {
            n += 1
        }
    }

    if (checkData.counter) {
        setFreeCarsCounter(checkData.counter - n);
    }
}
