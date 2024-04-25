import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CarImage } from '../../../interfaces/car.interface';


export interface SliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	images: CarImage[],
}
