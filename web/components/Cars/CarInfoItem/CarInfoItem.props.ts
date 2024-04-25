import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface CarInfoItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: string,
    value: string | number,
    type?: 'tel' | 'mailto',
}
