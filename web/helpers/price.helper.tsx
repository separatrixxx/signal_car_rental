import axios, { AxiosResponse } from "axios";
import { LocationData } from "../interfaces/location.interface";
import { setPrice } from "../features/price/priceSlice";
import { DatesInterface } from "../interfaces/dates.interface";
import { PriceInterface } from "../interfaces/price.interface";


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
    if (carLocation === dates.startLocation && carLocation !== dates.finishLocation) {
        return price.start_location === dates.finishLocation && price.finish_location === dates.startLocation;
    } else if (carLocation !== dates.startLocation && carLocation === dates.finishLocation) {
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
