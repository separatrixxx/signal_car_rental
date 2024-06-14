import axios, { AxiosResponse } from "axios";
import { CarInterface, Cars } from "../interfaces/car.interface";
import { setCars } from "../features/cars/carsSlice";
import { FilterActualInterface } from "../interfaces/filters.interface";
import { DatesInterface } from "../interfaces/dates.interface";


function sortLocation(cars: CarInterface[], dates: DatesInterface): CarInterface[] {
    return cars.sort((carA, carB) => {
        if (carA.location.location_code === dates.startLocation
            && carB.location.location_code !== dates.startLocation) {
            return -1;
        } else if (carA.location.location_code !== dates.startLocation
            && carB.location.location_code === dates.startLocation) {
            return 1;
        } else {
            return 0;
        }
    });
}

function sortPrice(cars: CarInterface[], sort: 'low' | 'high'): CarInterface[] {
    return cars.sort(function (a, b) {
        if (a.price > b.price && sort === 'low') {
          return 1;
        } else if (a.price < b.price && sort === 'low') {
            return -1;
        } else if (a.price > b.price && sort === 'high') {
            return -1;
        } else if (a.price < b.price && sort === 'high') {
            return 1;
        }
    
        return 0;
    });
}

function sortClass(cars: CarInterface[], filtersActual: FilterActualInterface): CarInterface[] {
    let carsNew: CarInterface[] = [];

    for (let car of cars) {
        if ((!filtersActual.class || filtersActual.class === car.class)
            && (!filtersActual.drive_unit || filtersActual.drive_unit === car.drive_unit)
            && (!filtersActual.engine_type || filtersActual.engine_type === car.engine_type)
            && (!filtersActual.transmission || filtersActual.transmission === car.transmission))
        {
            carsNew.push(car);
        }
    }

    return carsNew;
}

export async function getCars(dispatch: any, dates: DatesInterface, filtersActual?: FilterActualInterface,
    sort?: 'low' | 'high', name?: string) {
    
    try {
        const { data : response }: AxiosResponse<Cars> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/cars?populate=images%2C%20location');
            
        if (response.data && filtersActual && sort) {
            response.data = sortPrice(response.data, sort);

            if (name) {
                response.data = response.data.filter((car) => car.name.toLowerCase().startsWith(name.toLowerCase()));
            }

            const carsNew = sortClass(response.data, filtersActual);

            if (carsNew.length > 0 || filtersActual.class || filtersActual.drive_unit || filtersActual.engine_type
                || filtersActual.transmission || filtersActual.mileage
            ) {
                dispatch(setCars(sortLocation(carsNew, dates)));
            } else {
                dispatch(setCars(sortLocation(response.data, dates)));
            }
        } else {
            dispatch(setCars(sortLocation(response.data, dates)));
        }
    } catch (err) {
        console.log(err);
    }
}
