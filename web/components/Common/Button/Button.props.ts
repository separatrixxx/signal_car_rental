import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BookingInterface } from '../../../interfaces/booking.interface';


export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string,
    isActive: boolean,
    isLoading: boolean,
	onClick: (e: any) => void,
}