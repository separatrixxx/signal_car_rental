import { CarInfoProps } from './CarInfo.props';
import styles from './CarInfo.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import Image from 'next/image';
import { Htag } from '../../Common/Htag/Htag';
import { TextPad } from '../../Common/TextPad/TextPad';
import { setLocale } from '../../../helpers/locale.helper';
import { CarInfoItem } from '../CarInfoItem/CarInfoItem';
import { CarInterface } from '../../../interfaces/car.interface';
import { Slider } from '../../Slider/Slider/Slider';


export const CarInfo = ({ carId }: CarInfoProps): JSX.Element => {
    const router = useRouter();

    const car: CarInterface | undefined = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});

	if (car) {
		return (
			<div className={styles.carInfo}>
				<Slider images={car.images} />
				<TextPad>
					<Htag tag='xl' className={styles.carName}>
						{car.name}
					</Htag>
					<Htag tag='l' className={styles.description}>
						{router.locale === 'en' ? car.description : router.locale === 'ru' ?
							car.description_ru : car.description_ge}
					</Htag>
					<Htag tag='xl' className={styles.carPrice}>
						{setLocale(router.locale).from + ' ' + car.price + '₾ / ' + setLocale(router.locale).day}
					</Htag>
				</TextPad>
				<TextPad>
					<Htag tag='xl' className={styles.carName}>
						{setLocale(router.locale).specifications}
					</Htag>
					<CarInfoItem item={setLocale(router.locale).class + ':'} value={setLocale(router.locale)[car.class]} />
					<CarInfoItem item={setLocale(router.locale).engine_type + ':'}
						value={setLocale(router.locale)[car.engine_type]} />
					<CarInfoItem item={setLocale(router.locale).engine_capacity + ':'}
						value={car.engine_capacity + ' ' + setLocale(router.locale).liters} />
					<CarInfoItem item={setLocale(router.locale).engine_power + ':'}
						value={car.engine_power + ' ' + setLocale(router.locale).horse_power} />
					<CarInfoItem item={setLocale(router.locale).mileage + ':'}
						value={car.mileage + ' ' + setLocale(router.locale).kilometers} />
					<CarInfoItem item={setLocale(router.locale).transmission + ':'}
						value={setLocale(router.locale)[car.transmission]} />
					<CarInfoItem item={setLocale(router.locale).drive_unit + ':'}
						value={setLocale(router.locale)[car.drive_unit]} />
				</TextPad>
			</div>
		);
	} else {
		return <></>
	}
};
