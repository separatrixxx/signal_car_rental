import axios, { AxiosResponse } from "axios";
import { CarInterface, Cars } from "../interfaces/car.interface";
import { setCars } from "../features/cars/carsSlice";
import { FilterActualInterface } from "../interfaces/filters.interface";
import { DatesInterface } from "../interfaces/dates.interface";


export async function getCars(dispatch: any, dates: DatesInterface, router: any, filtersActual?: FilterActualInterface,
    sort?: 'low' | 'high', name?: string) {
    if (dates.startLocation === '') {
        router.push('/');
    }
    
    try {
        const { data : response }: AxiosResponse<Cars> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/cars?populate=images%2C%20location');

        response.data.sort((carA, carB) => {
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
            
        if (response.data && filtersActual && sort) {
            response.data.sort(function (a, b) {
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

            if (name) {
                response.data = response.data.filter((car) => car.name.toLowerCase().startsWith(name.toLowerCase()));
            }

            let carsNew: CarInterface[] = [];

            for (let car of response.data) {
                if ((!filtersActual.class || filtersActual.class === car.class)
                    && (!filtersActual.drive_unit || filtersActual.drive_unit === car.drive_unit)
                    && (!filtersActual.engine_type || filtersActual.engine_type === car.engine_type)
                    && (!filtersActual.transmission || filtersActual.transmission === car.transmission)
                    && (!filtersActual.mileage || ((filtersActual.mileage === '0 - 1000' && car.mileage <= 1000)
                        || (filtersActual.mileage === '1001 - 10000' && (car.mileage > 1000 && car.mileage <= 10000))
                        || (filtersActual.mileage === '10001 - 50000' && (car.mileage > 10000 && car.mileage <= 50000))
                        || (filtersActual.mileage === '50001 - 100000' && (car.mileage > 50000 && car.mileage <= 100000))
                        || (filtersActual.mileage === '100001 - 200000' && (car.mileage > 100000 && car.mileage <= 200000))
                        || (filtersActual.mileage === '200000+' && car.mileage > 200000)))
                    )
                {
                    carsNew.push(car);
                }
            }

            if (carsNew.length > 0 || filtersActual.class || filtersActual.drive_unit || filtersActual.engine_type
                || filtersActual.transmission || filtersActual.mileage
            ) {
                dispatch(setCars(carsNew));
            } else {
                dispatch(setCars(response.data));
            }
        } else {
            dispatch(setCars(response.data));
        }
    } catch (err) {
        console.log(err);
    }
}
