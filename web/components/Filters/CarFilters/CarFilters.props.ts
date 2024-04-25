import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FilterActualInterface, FilterInterface } from '../../../interfaces/filters.interface';


export interface CarFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    filtersActual: FilterActualInterface,
    setActive: (e: boolean) => void,
    setFilters: (e: FilterInterface[]) => void,
}
