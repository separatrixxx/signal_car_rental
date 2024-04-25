import { CarInterface } from "./car.interface";


export interface BookingInterface {
    clientName: string,
    phone: string,
    startDate: string,
    finishDate: string,
    car: CarInterface,
}

export interface BookingErrorInterface {
    errName: boolean,
    errPhone: boolean,
    errStart: boolean,
    errFinish: boolean,
}
