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
	const [displayedCars, setDisplayedCars] = useState(cars.slice(0, 20));
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView && displayedCars.length < cars.length) {
            const nextCars = cars.slice(displayedCars.length, displayedCars.length + 20);
            setDisplayedCars(prevCars => [...prevCars, ...nextCars]);
        }
    }, [inView, cars, displayedCars]);

	return (
		<>
			<div className={styles.carsDiv}>
				{
					cars.length !== 0 ? 
						displayedCars.map(car => (
							<CarsItem key={car.id} carId={car.id} />
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
