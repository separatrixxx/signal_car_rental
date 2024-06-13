import { StartFilterProps } from './StartFilter.props';
import styles from './StartFilter.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../Common/Input/Input';
import { setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { useDispatch } from "react-redux";
import { getDate } from '../../../helpers/date.helper';
import { DatesErrorInterface, DatesInterface } from '../../../interfaces/dates.interface';
import { setLocationsDate } from '../../../helpers/location.helper';

export const StartFilter = ({ startLocation, finishLocation, setActiveStart, setActiveFinish }: StartFilterProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState<string>('');
    const [finishDate, setFinishDate] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const errData: DatesErrorInterface = {
        errStartLocation: false,
        errFinishLocation: false,
        errStartDate: false,
        errFinishDate: false,
    };

    const [error, setError] = useState<DatesErrorInterface>(errData);

    const startFilterData: DatesInterface = {
        startLocation: startLocation.location_code,
        finishLocation: finishLocation.location_code,
        startDate: startDate,
        finishDate: finishDate,
    };

    useEffect(() => {
        const filterElement = document.querySelector(`.${styles.startFilter}`);
        const initialPosition = (filterElement?.getBoundingClientRect().top || 0) + window.scrollY;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (filterElement) {
                if (scrollPosition > initialPosition && !filterElement.classList.contains(styles.fixed)) {
                    filterElement.classList.add(styles.fixed);
                } else if (scrollPosition <= initialPosition && filterElement.classList.contains(styles.fixed)) {
                    filterElement.classList.remove(styles.fixed);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.startFilter}>
            <Input type="location" text={startLocation.location_code === '' ? setLocale(router.locale).start_location :
                (router.locale === 'ka' ? startLocation.location_ge : router.locale === 'ru' ? startLocation.location_ru
                : startLocation.location)}
                value={router.locale === 'ka' ? startLocation.location_ge : router.locale === 'ru' ? startLocation.location_ru
                : startLocation.location} error={error.errStartLocation} isActive={startLocation.location_code === '' ? false : true}
                onChange={setActiveStart} />
            <Input type="location" text={finishLocation.location_code === '' ? setLocale(router.locale).finish_location :
                (router.locale === 'ka' ? finishLocation.location_ge : router.locale === 'ru' ? finishLocation.location_ru
                : finishLocation.location)}
                value={router.locale === 'ka' ? finishLocation.location_ge : router.locale === 'ru' ? finishLocation.location_ru
                : finishLocation.location} error={error.errFinishLocation} isActive={finishLocation.location_code === '' ? false : true}
                onChange={setActiveFinish} />
            <Input type="date" text={setLocale(router.locale).start_date} value={startDate} minDate={getDate()}
                error={error.errStartDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input type="date" text={setLocale(router.locale).finish_date} value={finishDate} minDate={getDate()}
                error={error.errFinishDate} onChange={(e) => setFinishDate(e.target.value)} />
            <Button text={setLocale(router.locale).find_cars} isActive={true} isLoading={isLoading} className={styles.startButton}
                onClick={() => setLocationsDate(startFilterData, errData, router, setIsLoading, setError, dispatch)} />
        </div>
    );
};
