import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface TextPadProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode,
}
