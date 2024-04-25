import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	carId: number;
}
