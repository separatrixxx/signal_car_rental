import styles from './CarsList.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { CarsItem } from '../CarsItem/CarsItem';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { LoadingDots } from '../../Common/LoadingDots/LoadingDots';


export const CarsList = (): JSX.Element => {
    const router = useRouter();

    const cars = useSelector((state: AppState) => state.cars.cars);

    const limit = 20;
    const [displayedCars, setDisplayedCars] = useState(cars.slice(0, limit));
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && displayedCars.length < cars.length) {
            const nextCars = cars.slice(displayedCars.length, displayedCars.length + limit);
            setDisplayedCars(prevCars => [...prevCars, ...nextCars]);
        }
    }, [inView, cars, displayedCars]);

    return (
        <>
            <div className={styles.carsDiv}>
                {
                    cars.length !== 0 ? 
                        displayedCars.map((car, index) => (
                            <CarsItem key={`${car.id}-${index}`} carId={car.id} />
                        ))
                    :
                        <Htag tag='m' className={styles.emptyText}>
                            {setLocale(router.locale).list_of_cars_empty}
                        </Htag>
                }
            </div>
            {
                cars.length !== displayedCars.length ?
                    <div ref={ref} className={styles.loadingIndicator}>
                        <LoadingDots />
                    </div>
                : <></>
            }
        </>
    );
};
