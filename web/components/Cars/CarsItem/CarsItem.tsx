import { CarsItemProps } from './CarsItem.props';
import styles from './CarsItem.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { setLocale } from '../../../helpers/locale.helper';


export const CarsItem = ({ carId }: CarsItemProps): JSX.Element => {
    const router = useRouter();

    const car = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});
    
	if (car) {
		return (
			<Link href={'/cars/' + car.id} className={styles.carItem}>
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
						{car.name}
					</Htag>
					<Htag tag='l'>
						{setLocale(router.locale).from + ' ' + car.price + '₾ / ' + setLocale(router.locale).day}
					</Htag>
				</div>
			</Link>
		);
	} else {
		return <></>
	}
};
