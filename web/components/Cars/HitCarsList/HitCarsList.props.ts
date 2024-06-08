import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HitCarsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isHit: boolean,
}
