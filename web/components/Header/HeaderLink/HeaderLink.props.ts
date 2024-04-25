import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HeaderLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    text: string,
    link: string,
}