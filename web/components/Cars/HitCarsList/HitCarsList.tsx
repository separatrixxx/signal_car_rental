import { HitCarsListProps } from './HitCarsList.props';
import styles from './HitCarsList.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { CarsItem } from '../CarsItem/CarsItem';


export const HitCarsList = ({ isHit }: HitCarsListProps): JSX.Element => {
	const router = useRouter();

    const cars = useSelector((state: AppState) => state.cars.cars).filter((car) => isHit ? car.hit : !car.hit)
        .sort(function (a, b) {
            if (a.price > b.price) {
                return 1;
            } else if (a.price < b.price) {
                return -1;
            }
        
            return 0;
        });

	if (cars) {
        return (
            <div className={styles.carsDiv}>
                {
                    cars.length !== 0 ? 
                        cars.map(car => (
                            <CarsItem key={car.id} carId={car.id} isStart={true} />
                        ))
                    :
                        <Htag tag='m' className={styles.emptyText}>
                            {setLocale(router.locale).list_of_cars_empty}
                        </Htag>
                }
            </div>
        );
    } else {
        return <></>
    }
};
