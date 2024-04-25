import { FilterActualInterface, FilterInterface } from "../../../interfaces/filters.interface";


export interface ModaFiltersProps {
	filters: FilterInterface[],
	filtersActual: FilterActualInterface,
	setActiveFilters: (e: boolean) => void,
	setFiltersActual: (e: FilterActualInterface) => void,
}
