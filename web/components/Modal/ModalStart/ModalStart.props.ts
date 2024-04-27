import { FilterActualInterface, FilterInterface } from "../../../interfaces/filters.interface";
import { LocationInterface } from "../../../interfaces/location.interface";


export interface ModalStartProps {
	locations: LocationInterface[],
	setLocation: (e: LocationInterface) => void,
	setActive: (e: boolean) => void
}
