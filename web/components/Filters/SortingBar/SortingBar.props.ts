import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FilterActualInterface, FilterInterface } from '../../../interfaces/filters.interface';


export interface SortingBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: 'low' | 'high',
	name: string,
	setSort: (e: 'low' | 'high') => void,
	setName: (e: string) => void,
}
