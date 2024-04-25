import styles from './CarsList.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { CarsItem } from '../CarsItem/CarsItem';


export const CarsList = (): JSX.Element => {
	const router = useRouter();

    const cars = useSelector((state: AppState) => state.cars.cars);

	return (
		<div className={styles.carsDiv}>
			{
				cars.length !== 0 ? 
					cars.map(car => (
						<CarsItem key={car.id} carId={car.id} />
					))
				:
					<Htag tag='m' className={styles.emptyText}>
						{setLocale(router.locale).list_of_cars_empty}
					</Htag>
			}
		</div>
	);
};
