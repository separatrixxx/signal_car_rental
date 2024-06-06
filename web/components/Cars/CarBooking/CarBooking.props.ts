import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarBookingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	carId: number,
	isStart: boolean,
	startDatetime: string,
	finishDatetime: string,
	setStartDatetime: (e: string) => void,
	setFinishDatetime: (e: string) => void,
	setStartLocationModal: (e: string) => void,
	setFinishLocationModal: (e: string) => void,
}
