import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface BurgerMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	open: boolean,
	setOpen: (e: boolean) => void,
	setHidden: (e: boolean) => void,
}