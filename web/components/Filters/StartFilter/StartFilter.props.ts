import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { LocationInterface } from '../../../interfaces/location.interface';


export interface StartFilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    startLocation: LocationInterface,
    finishLocation: LocationInterface,
    setActiveStart: (e: boolean) => void,
    setActiveFinish: (e: boolean) => void,
}
