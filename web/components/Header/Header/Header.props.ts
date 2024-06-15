import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    isStart?: boolean;
    setActiveLocale: (e: boolean) => void;
    setActiveCurrency: (e: boolean) => void;
}