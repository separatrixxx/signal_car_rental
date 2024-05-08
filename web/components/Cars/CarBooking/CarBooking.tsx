import { CarBookingProps } from './CarBooking.props';
import styles from './CarBooking.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { useState } from 'react';
import { Input } from '../../Common/Input/Input';
import { setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { BookingErrorInterface, BookingInterface } from '../../../interfaces/booking.interface';
import { checkData } from '../../../helpers/booking_car.helper';
import { useDispatch } from "react-redux";
import { getDate } from '../../../helpers/date.helper';
import { Htag } from '../../Common/Htag/Htag';
import { setDeliveryPrice } from '../../../helpers/price.helper';
import { checkAvailableCars } from '../../../helpers/rented.helper';


export const CarBooking = ({ carId }: CarBookingProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const car = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === 2;
	});

    const dates = useSelector((state: AppState) => state.dates.dates);
    const price = useSelector((state: AppState) => state.price.price);
    const rented = useSelector((state: AppState) => state.rented.rented).filter(function (rentedCar) {
		return rentedCar.car_id === carId && rentedCar.status !== 'free' && rentedCar.status !== 'canceled';
	});

    const [clientName, setClientName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [finishDate, setFinishDate] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const errData: BookingErrorInterface = {
        errName: false,
        errPhone: false,
        errStart: false,
        errFinish: false,
    };

    const [error, setError] = useState<BookingErrorInterface>(errData);
    
    const [freeCarsCounter, setFreeCarsCounter] = useState<number>(checkAvailableCars(car?.counter, rented, dates));

	if (car) {
        const bookingCarData: BookingInterface = {
            clientName: clientName,
            phone: phone,
            startDate: startDate,
            finishDate: finishDate,
            car: car,
        };

		return (
			<div className={styles.carBooking}>
                <Input type="text" text={setLocale(router.locale).your_name} value={clientName}
                    error={error.errName} onChange={(e) => setClientName(e.target.value)} />
                <Input type="phone" text={setLocale(router.locale).phone_number} value={phone}
                    error={error.errPhone} onChange={(e) => setPhone(e.target.value)} />
                <Input type="time" text={setLocale(router.locale).start_time} value={startDate} minDate={getDate()}
                    error={error.errStart} onChange={(e) => setStartDate(e.target.value)} />
                <Input type="time" text={setLocale(router.locale).finish_time} value={finishDate} minDate={getDate()}
                    error={error.errFinish} onChange={(e) => setFinishDate(e.target.value)} />
                <Htag tag='l' className={styles.car_price}>
					{setLocale(router.locale).booking_price + ': ' + (car.price 
                        + setDeliveryPrice(car.location.location_code, dates, price)) * 0.1 + '₾'}
				</Htag>
                <Htag tag='m' className={styles.car_counter}>
					{setLocale(router.locale).available_cars_left + ': ' + freeCarsCounter}
				</Htag>
                <Button text={freeCarsCounter > 0 ? setLocale(router.locale).book_car : setLocale(router.locale).no_cars}
                    isActive={freeCarsCounter > 0} isLoading={isLoading}
                    onClick={() => {
                        checkData(bookingCarData, errData, dates, setIsLoading, setError, router);
                        setFreeCarsCounter(freeCarsCounter - 1);
                    }} />
			</div>
		);
	} else {
		return <></>
	}
};
