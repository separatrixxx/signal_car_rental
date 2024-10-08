import { StartFilterProps } from './StartFilter.props';
import styles from './StartFilter.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../Common/Input/Input';
import { getLocaleLocation, setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { useDispatch } from "react-redux";
import { getDate } from '../../../helpers/date.helper';
import { DatesErrorInterface, DatesInterface } from '../../../interfaces/dates.interface';
import { setLocationsDate } from '../../../helpers/location.helper';
import { motion } from 'framer-motion';
import { useScrollY } from '../../../hooks/useScrollY';
import { useResizeW } from '../../../hooks/useResize';


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

    const [lastScroll, setLastScroll] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(false);

    const scrollPosition = useScrollY();

    if (scrollPosition - lastScroll >= 200 && scrollPosition > lastScroll) {
        setFlag(true);
        setLastScroll(scrollPosition);
    } else if (scrollPosition < lastScroll) {
        setFlag(false);
        setLastScroll(scrollPosition);
    }

    const variants = {
        visible: {
            transform: 'translate(0px, 0px)',
        },
        hidden: {
            transform: 'translate(0px, -64px)',
        }
    };

    const width = useResizeW();

    return (
        <motion.div className={styles.startFilter}
            variants={variants}
            initial={flag && width > 1024 ? 'hidden' : 'visible'}
            transition={{ duration: 0.3 }}
            animate={flag && width > 1024 ? 'hidden' : 'visible'}>
            <Input type="location" text={startLocation.location_code === '' ? setLocale(router.locale).start_location :
                getLocaleLocation(router.locale, startLocation)}
                value={getLocaleLocation(router.locale, startLocation)} error={error.errStartLocation}
                isActive={startLocation.location_code === '' ? false : true} onChange={setActiveStart} />
            <Input type="location" text={finishLocation.location_code === '' ? setLocale(router.locale).finish_location :
                getLocaleLocation(router.locale, finishLocation)}
                value={getLocaleLocation(router.locale, finishLocation)} error={error.errFinishLocation}
                isActive={finishLocation.location_code === '' ? false : true} onChange={setActiveFinish} />
            <Input type="date" text={setLocale(router.locale).start_date} value={startDate} minDate={getDate()}
                error={error.errStartDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input type="date" text={setLocale(router.locale).finish_date} value={finishDate} minDate={getDate()}
                error={error.errFinishDate} onChange={(e) => setFinishDate(e.target.value)} />
            <Button text={setLocale(router.locale).find_cars} isActive={true} isLoading={isLoading} className={styles.startButton}
                onClick={() => setLocationsDate(startFilterData, errData, router, setIsLoading, setError, dispatch)} />
        </motion.div>
    );
};
