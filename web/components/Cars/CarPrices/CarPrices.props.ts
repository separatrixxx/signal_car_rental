import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PriceCoeffsInterface } from '../../../interfaces/car.interface';


export interface CarPricesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	price: PriceCoeffsInterface,
	isStart: boolean,
	startDatetime: string,
	finishDatetime: string,
}
