import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarBookingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	carId: number;
}
