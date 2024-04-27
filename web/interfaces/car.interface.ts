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
    price: number,
    counter: number,
    class: 'econom' | 'comfort' | 'business' | 'premium' | 'suv' | 'minivan',
    engine_type: 'gasoline' | 'diesel' | "hybrid" | 'electricity',
    engine_capacity: number,
    engine_power: number,
    mileage: number,
    transmission: 'automatic' | 'manual',
    drive_unit: 'front_wheel' | 'rear',
    location: LocationInterface,
    images: CarImage[],
}

export interface CarImage {
    id: number,
    alternativeText: string,
    url: string,
}
