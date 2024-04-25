import axios, { AxiosResponse } from "axios";
import { setinfo } from "../features/info/infoSlice";
import { InfoData } from "../interfaces/info.interface";


export async function getInfo(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<InfoData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/company-infos');

        if (response.data[0]) {
            dispatch(setinfo(response.data[0]));
        }
    } catch (err) {
        console.log(err);
    }
}
