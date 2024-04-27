import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: 'text' | 'date' | 'time' | 'phone' | 'location',
	text: string,
	value: string,
	minDate?: string,
	error: boolean,
	isSearch?: boolean,
	isActive?: boolean,
	onChange: (e: any) => void,
}