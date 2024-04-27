import { FilterActualInterface, FilterInterface } from "../../../interfaces/filters.interface";


export interface ModalFiltersProps {
	filters: FilterInterface[],
	filtersActual: FilterActualInterface,
	setActiveFilters: (e: boolean) => void,
	setFiltersActual: (e: FilterActualInterface) => void,
}
