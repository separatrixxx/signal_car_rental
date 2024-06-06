import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	carId: number;
	isStart: boolean;
}
