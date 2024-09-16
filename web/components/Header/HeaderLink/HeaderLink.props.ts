import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HeaderLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    hidden: boolean,
    text: string,
    link: string,
}