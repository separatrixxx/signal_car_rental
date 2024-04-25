import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface SlideProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	image: string,
	alt: string,
}