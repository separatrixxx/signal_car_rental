import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BookingInterface } from '../../../interfaces/booking.interface';


export interface ByBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    color: 'light' | 'dark',
}
