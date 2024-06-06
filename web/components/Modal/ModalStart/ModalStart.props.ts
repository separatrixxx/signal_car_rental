import { FilterActualInterface, FilterInterface } from "../../../interfaces/filters.interface";
import { LocationInterface } from "../../../interfaces/location.interface";


export interface ModalStartProps {
	locations: LocationInterface[],
	type?: 'start' | 'finish',
	setLocation: (e: LocationInterface) => void,
	setActive: (e: boolean) => void,
	setStartLocation?: (e: string) => void,
	setFinishLocation?: (e: string) => void,
}
