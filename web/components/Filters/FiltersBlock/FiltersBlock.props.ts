import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface FiltersBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode,
}
