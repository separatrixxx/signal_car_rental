import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarPricesItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string,
    price: string,
    isActive: boolean,
}
