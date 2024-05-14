import axios, { AxiosResponse } from "axios";
import { CarRented, CarRentedData } from "../interfaces/car.interface";
import { setRented } from "../features/rented/rentedSlice";
import { DatesInterface } from "../interfaces/dates.interface";


export async function getRented(dispatch: any) {
    const { data : response }: AxiosResponse<CarRentedData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
        '/api/rented-cars?populate=car');
    
    dispatch(setRented(response.data));
}

export function checkAvailableCars(counter: number | undefined, rented: CarRented[], dates: DatesInterface): number {
    let n = 0;

    const startDate = new Date(dates.startDate);
    const finishDate = new Date(dates.finishDate);

    for (let cr of rented) {
        const startDateRented = new Date(cr.start_date);
        const finishDateRented = new Date(cr.finish_date);

        if (startDate.setHours(0, 0, 0, 0) <= finishDateRented.setHours(0, 0, 0, 0) && finishDate.setHours(0, 0, 0, 0) >= startDateRented.setHours(0, 0, 0, 0)) {
            n += 1
        }
    }

    if (counter) {
        return counter - n;
    } else {
        return 0;
    }
}
