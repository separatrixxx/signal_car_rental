import axios, { AxiosResponse } from "axios";
import { LocationData } from "../interfaces/location.interface";
import { setPrice } from "../features/price/priceSlice";
import { DatesInterface } from "../interfaces/dates.interface";
import { PriceInterface } from "../interfaces/price.interface";
import { PriceCoeffsInterface } from "../interfaces/car.interface";


export async function getPrice(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<LocationData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/prices?populate=start_location%2C%20finish_location');

        dispatch(setPrice(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function checkPrices(carLocation: string, startLocation: string, finishLocation: string,
    price: PriceInterface): boolean {
    if (carLocation === startLocation && carLocation !== finishLocation
        || carLocation !== startLocation && carLocation === finishLocation
    ) {
        return price.start_location === finishLocation && price.finish_location === startLocation;
    } else if (carLocation !== startLocation && carLocation !== finishLocation) {
        return price.start_location === carLocation && price.finish_location === startLocation
            || price.start_location === finishLocation && price.finish_location === carLocation;
    }

    return false;
}

export function setDeliveryPrice(carLocation: string, startLocation: string, finishLocation: string,
    price: PriceInterface[]): number {
    const newPrices = price.filter(p => checkPrices(carLocation, startLocation, finishLocation, p));
    let deliveryPrice = 0;

    for (let np of newPrices) {
        deliveryPrice += np.price;
    }

    return deliveryPrice;
}

export function setPriceCoeff(dates: DatesInterface, priceCoeffs: PriceCoeffsInterface,
    isStart?: boolean, startDatetime?: string, finishDatetime?: string): number {
    const startDate = isStart ? (startDatetime ? new Date(startDatetime) : new Date()) : new Date(dates.startDate);
    const finishDate = isStart ? (finishDatetime ? new Date(finishDatetime) : new Date()) : new Date(dates.finishDate);

    const timeDifference = Math.abs(finishDate.setHours(0, 0, 0, 0) - startDate.setHours(0, 0, 0, 0));
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

    if (numberOfDays > 25) {
        return Math.round(priceCoeffs.price5);
    } else if (numberOfDays >= 10) {
        return Math.round(priceCoeffs.price4);
    } else if (numberOfDays >= 4) {
        return Math.round(priceCoeffs.price3);
    } else if (numberOfDays >= 2) {
        return Math.round(priceCoeffs.price2);
    }
    
    return priceCoeffs.price1;
}
