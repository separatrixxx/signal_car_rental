import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    isStart?: boolean;
    setActive: (e: boolean) => void;
}