import { CarsItemProps } from './CarsItem.props';
import styles from './CarsItem.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { setLocale } from '../../../helpers/locale.helper';
import { setPriceCoeff } from '../../../helpers/price.helper';
import { useEffect, useState } from 'react';
import { checkAvailableCars } from '../../../helpers/rented.helper';
import cn from 'classnames';
import { CarCounterInterface } from '../../../interfaces/car.interface';


export const CarsItem = ({ carId, isStart }: CarsItemProps): JSX.Element => {
    const router = useRouter();

    const car = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});
	const rented = useSelector((state: AppState) => state.rented.rented).filter(function (rentedCar) {
		return rentedCar.car_id === carId && rentedCar.status !== 'free' && rentedCar.status !== 'canceled';
	});
	const dates = useSelector((state: AppState) => state.dates.dates);

    const [freeCarsCounter, setFreeCarsCounter] = useState<number>(0);

    useEffect(() => {
        if (car) {
            const checkCounterData: CarCounterInterface = {
                counter: car.counter,
                rented: rented,
                dates: dates,
            };

            checkAvailableCars(checkCounterData, setFreeCarsCounter);
        }
    }, [car, rented, dates]);
    
	if (car) {
		return (
			<Link href={'/cars/' + car.id} className={cn(styles.carItem, {
				[styles.carHit]: car.hit,
			})}>
				{
					car.hit ? 
						<div className={styles.hitBox}>
							<Htag tag='l'>
								{setLocale(router.locale).hit}
							</Htag>
						</div>
					: <></>
				}
				<div className={styles.imageBlock}>
					<Image className={styles.img} draggable='false'
						loader={() => process.env.NEXT_PUBLIC_DOMAIN + car.images[0].url}
						src={process.env.NEXT_PUBLIC_DOMAIN + car.images[0].url}
						alt={car.images[0].alternativeText}
						width={1}
						height={1}
						priority={true}
						unoptimized={true}
					/>
				</div>
				<div className={styles.carInfoBlock}>
					<Htag tag='m' className={styles.name}>
						{car.name + ' | ' + (router.locale === 'ka' ?
							car.location.location_ge : router.locale === 'ru' ?
							car.location.location_ru : car.location.location)}
					</Htag>
					<Htag tag='l'>
						{
							isStart ? setLocale(router.locale).from + ' ' + setPriceCoeff(dates, car.price) + '₾ / '
								+ setLocale(router.locale).day
							: setPriceCoeff(dates, car.price) + '₾ / '
								+ setLocale(router.locale).day
						}
					</Htag>
					{
						freeCarsCounter && !isStart ?
							<Htag tag='m' className={cn(styles.name, styles.carsAvailable)}>
								{setLocale(router.locale).available_cars_left + ': ' + freeCarsCounter}
							</Htag>
						: !isStart ?
							<Htag tag='m' className={cn(styles.name, styles.outOfStock)}>
								{setLocale(router.locale).out_of_stock}
							</Htag>
						: <></>
					}
				</div>
			</Link>
		);
	} else {
		return <></>
	}
};
