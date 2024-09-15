import { CarInfoProps } from './CarInfo.props';
import styles from './CarInfo.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { Htag } from '../../Common/Htag/Htag';
import { TextPad } from '../../Common/TextPad/TextPad';
import { getCarDescription, setLocale } from '../../../helpers/locale.helper';
import { CarInfoItem } from '../CarInfoItem/CarInfoItem';
import { CarInterface } from '../../../interfaces/car.interface';
import { Slider } from '../../Slider/Slider/Slider';
import { getDaysNum, setDeliveryPrice, setPriceCoeff } from '../../../helpers/price.helper';
import Question from './question.svg';
import { Modal } from '../../Modal/Modal/Modal';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CarPrices } from '../CarPrices/CarPrices';
import cn from 'classnames';


export const CarInfo = ({ carId, isStart, startDatetime, finishDatetime, startLocation, finishLocation }:
	CarInfoProps): JSX.Element => {
    const router = useRouter();

    const car: CarInterface | undefined = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});

	const dates = useSelector((state: AppState) => state.dates.dates);
	const price = useSelector((state: AppState) => state.price.price);
	const currency = useSelector((state: AppState) => state.currency.currency);
	const rates = useSelector((state: AppState) => state.rates.rates);

	const [active, setActive] = useState<boolean>(false);

	if (car) {	
		return (
			<>
				<div className={styles.carInfo}>
					<Slider images={car.images} />
					<TextPad>
						<CarPrices price={car.price} isStart={isStart} startDatetime={startDatetime}
							finishDatetime={finishDatetime} />
					</TextPad>
					<TextPad>
						<Htag tag='xl' className={styles.carName}>
							{car.name}
						</Htag>
						<Htag tag='l' className={styles.description}>
							<ReactMarkdown>
								{getCarDescription(router.locale, car)}
							</ReactMarkdown>
						</Htag>
						<Htag tag='xl' className={styles.carPrice}>
							{getDaysNum(dates, isStart, startDatetime, finishDatetime) * 
								setPriceCoeff(dates, car.price, currency.code, rates, isStart, startDatetime, finishDatetime)
									+ currency.symbol}
						</Htag>
						{
							!isStart ?
								setDeliveryPrice(car.location.location_code, dates.startLocation, dates.finishLocation, price,
									currency.code, rates) > 0 ?
									<Htag tag='l' className={styles.carPrice}>
										{setLocale(router.locale).delivery_price + ': ' +
											setDeliveryPrice(car.location.location_code, dates.startLocation,
											dates.finishLocation, price, currency.code, rates) + currency.symbol}
										<Question className={styles.question} onClick={() => setActive(true)}/>
									</Htag>
								: <></>
							: startLocation && finishLocation ?
								setDeliveryPrice(car.location.location_code, startLocation, finishLocation, price,
									currency.code, rates) > 0 ?
									<Htag tag='l' className={styles.carPrice}>
										{setLocale(router.locale).delivery_price + ': ' +
											setDeliveryPrice(car.location.location_code, startLocation, finishLocation, price,
												currency.code, rates) + currency.symbol}
										<Question className={styles.question} onClick={() => setActive(true)}/>
									</Htag>
								: <></>
							: 
								<Htag tag='l' className={cn(styles.carPrice, styles.enterLocations)}>
									{setLocale(router.locale).enter_locations}
								</Htag>
						}
					</TextPad>
					<TextPad>
						<Htag tag='xl' className={styles.carName}>
							{setLocale(router.locale).specifications}
						</Htag>
						<CarInfoItem item={setLocale(router.locale).class + ':'} value={setLocale(router.locale)[car.class]} />
						<CarInfoItem item={setLocale(router.locale).fuel_type + ':'}
							value={setLocale(router.locale)[car.engine_type]} />
						<CarInfoItem item={setLocale(router.locale).engine_capacity + ':'}
							value={car.engine_capacity + ' ' + setLocale(router.locale).liters} />
						<CarInfoItem item={setLocale(router.locale).engine_power + ':'}
							value={car.engine_power + ' ' + setLocale(router.locale).horse_power} />
						<CarInfoItem item={setLocale(router.locale).transmission + ':'}
							value={setLocale(router.locale)[car.transmission]} />
						<CarInfoItem item={setLocale(router.locale).drive_unit + ':'}
							value={setLocale(router.locale)[car.drive_unit]} />
					</TextPad>
				</div>
				<Modal active={active} setActive={setActive}>
                    <Htag tag="l" className={styles.questionText}>
                        {setLocale(router.locale).question_delivery}
                    </Htag>
                </Modal>
			</>
		);
	} else {
		return <></>
	}
};
