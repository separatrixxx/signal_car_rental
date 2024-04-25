import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarsItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	carId: number;
}
