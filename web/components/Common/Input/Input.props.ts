import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: 'text' | 'date' | 'phone',
	text: string,
	value: string,
	minDate?: string,
	error: boolean,
	isSearch?: boolean,
	onChange: (e: any) => void,
}