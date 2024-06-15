import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface LocaleChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    isCurrency: boolean;
    setActiveLocale: (e: boolean) => void,
    setActiveCurrency: (e: boolean) => void,
}
