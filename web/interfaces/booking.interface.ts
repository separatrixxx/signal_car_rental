import { CarInterface } from "./car.interface";
import { LocationInterface } from "./location.interface";


export interface BookingInterface {
    clientName: string,
    phone: string,
    startDate: string,
    finishDate: string,
    car: CarInterface,
    startLocation?: LocationInterface,
    finishLocation?: LocationInterface,
}

export interface BookingErrorInterface {
    errName: boolean,
    errPhone: boolean,
    errStart: boolean,
    errFinish: boolean,
    errStartLocation?: boolean,
    errFinishLocation?: boolean,
}
