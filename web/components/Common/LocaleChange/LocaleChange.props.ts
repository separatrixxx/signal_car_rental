import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface LocaleChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    setActive: (e: boolean) => void;
}