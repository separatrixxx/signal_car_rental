import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FilterActualInterface, FilterInterface } from '../../../interfaces/filters.interface';


export interface FilterItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	text: string,
    filters: FilterInterface[],
    filtersActual: FilterActualInterface;
    filterType: 'class' | 'mileage' | 'engine_type' | 'transmission' | 'drive_unit',
    setFilters: (e: FilterInterface[]) => void,
    setActive: (e: boolean) => void,
}