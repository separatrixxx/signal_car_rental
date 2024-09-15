import { DatesInterface } from "./dates.interface";
import { LocationInterface } from "./location.interface";

export interface Cars {
    data: CarInterface[],
}

export interface CarData {
    data: CarInterface,
}

export interface CarInterface {
    id: number,
	name: string,
    description: string,
    description_ru: string,
    description_ge: string,
    description_pl: string,
    description_he: string,
    counter: number,
    class: 'econom' | 'comfort' | 'business' | 'premium' | 'suv' | 'minivan',
    engine_type: 'gasoline' | 'diesel' | "hybrid" | 'electricity',
    engine_capacity: number,
    engine_power: number,
    transmission: 'automatic' | 'manual',
    drive_unit: 'front_wheel' | 'rear',
    location: LocationInterface,
    images: CarImage[],
    hit: boolean,
    price: PriceCoeffsInterface,
}

export interface CarImage {
    id: number,
    alternativeText: string,
    url: string,
}

export interface CarRentedData {
    data: CarRented[],
}

export interface CarRented {
    car_id: number,
    start_date: Date,
    finish_date: Date,
    status: 'free' | 'booked' | 'rented' | 'processing' | 'canceled',
}

export interface PriceCoeffsInterface {
    price1: number,
    price2: number,
    price3: number,
    price4: number,
    price5: number,
}

export interface CarCounterInterface {
    counter?: number,
    rented: CarRented[],
    dates: DatesInterface,
    isStart?: boolean,
    startDatetime?: string,
    finishDatetime?: string,
}
