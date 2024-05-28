import axios, { AxiosResponse } from "axios";
import { LocationData } from "../interfaces/location.interface";
import { setPrice } from "../features/price/priceSlice";
import { DatesInterface } from "../interfaces/dates.interface";
import { PriceCoeffsInterface, PriceInterface } from "../interfaces/price.interface";
import { setCoeffs } from "../features/coeffs/coeffsSlice";


export async function getPrice(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<LocationData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/prices?populate=start_location%2C%20finish_location');

        dispatch(setPrice(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function checkPrices(carLocation: string, dates: DatesInterface, price: PriceInterface): boolean {
    if (carLocation === dates.startLocation && carLocation !== dates.finishLocation
        || carLocation !== dates.startLocation && carLocation === dates.finishLocation
    ) {
        return price.start_location === dates.finishLocation && price.finish_location === dates.startLocation;
    } else if (carLocation !== dates.startLocation && carLocation !== dates.finishLocation) {
        return price.start_location === carLocation && price.finish_location === dates.startLocation
            || price.start_location === dates.finishLocation && price.finish_location === carLocation;
    }

    return false;
}

export function setDeliveryPrice(carLocation: string, dates: DatesInterface, price: PriceInterface[]): number {
    const newPrices = price.filter(p => checkPrices(carLocation, dates, p));
    let deliveryPrice = 0;

    for (let np of newPrices) {
        deliveryPrice += np.price;
    }

    return deliveryPrice;
}

export async function getCoeffs(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<PriceCoeffsInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/price-coeffs/1');

        dispatch(setCoeffs(response));
    } catch (err) {
        console.log(err);
    }
}

export function setPriceCoeff(price: number, dates: DatesInterface, coeffs: PriceCoeffsInterface): number {
    const startDate = new Date(dates.startDate);
    const finishDate = new Date(dates.finishDate);

    const timeDifference = Math.abs(finishDate.getTime() - startDate.getTime());
    const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;

    if (numberOfDays >= 3) {
        return price * coeffs.coeff1;
    } else if (numberOfDays >= 7) {
        return price * coeffs.coeff2;
    } else if (numberOfDays > 14) {
        return price * coeffs.coeff3;
    }
    
    return price;
}
