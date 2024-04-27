import axios, { AxiosResponse } from "axios";
import { LocationData } from "../interfaces/location.interface";
import { setLocations } from "../features/locations/locationsSlice";
import { DatesErrorInterface, DatesInterface } from "../interfaces/dates.interface";
import { setLocale } from "./locale.helper";
import { ToastError } from "../components/Common/Toast/Toast";
import { setDates } from "../features/dates/datesSlice";


export async function getLocations(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<LocationData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/locations');

        dispatch(setLocations(response.data));
    } catch (err) {
        console.log(err);
    }
}

export function setLocationsDate(startFilterData: DatesInterface, errData: DatesErrorInterface, router: any, 
    setIsLoading: (e: boolean) => void, setError: (e: DatesErrorInterface) => void, dispatch: any) {
    setIsLoading(true);

    setError(errData);
    
    if (startFilterData.startLocation !== '' && startFilterData.finishLocation !== ''
        && startFilterData.startDate !== '' && startFilterData.finishDate !== '') {
        dispatch(setDates(startFilterData));
        console.log(startFilterData)

        setIsLoading(false);
    } else {
        setIsLoading(false);
        ToastError(setLocale(router.locale).enter_data);
        
        if (startFilterData.startLocation === '') {
            errData.errStartLocation = true;
        }

        if (startFilterData.finishLocation === '') {
            errData.errFinishLocation = true;
        }

        if (startFilterData.startDate === '') {
            errData.errStartDate = true;
        }

        if (startFilterData.finishDate === '') {
            errData.errFinishDate = true;
        }
    }
}
