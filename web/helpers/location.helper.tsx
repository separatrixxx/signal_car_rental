import axios, { AxiosResponse } from "axios";
import { LocationData } from "../interfaces/location.interface";
import { setLocations } from "../features/locations/locationsSlice";
import { DatesErrorInterface, DatesInterface } from "../interfaces/dates.interface";
import { setLocale } from "./locale.helper";
import { ToastError } from "../components/Common/Toast/Toast";
import { setDates } from "../features/dates/datesSlice";
import { getDateInput } from "./date.helper";


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
    
    if (startFilterData.startLocation !== '' && startFilterData.finishLocation !== '') {
        if (startFilterData.startDate === '') {
            startFilterData.startDate = getDateInput('date');
        }

        if (startFilterData.finishDate === '') {
            startFilterData.finishDate = getDateInput('date');
        }

        dispatch(setDates(startFilterData));

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
    }
}
