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
import { getDate } from '../../../helpers/date.helper';
import { Htag } from '../../Common/Htag/Htag';
import { setPriceCoeff } from '../../../helpers/price.helper';
import { checkAvailableCars } from '../../../helpers/rented.helper';
import Question from './question.svg';
import { Modal } from '../../Modal/Modal/Modal';
import { LocationInterface } from '../../../interfaces/location.interface';
import { ModalStart } from '../../Modal/ModalStart/ModalStart';


export const CarBooking = ({ carId, isStart, startDatetime, finishDatetime, setStartDatetime,
    setFinishDatetime, setStartLocationModal, setFinishLocationModal }: CarBookingProps): JSX.Element => {
    const router = useRouter();

    const car = useSelector((state: AppState) => state.cars.cars).find(function (car) {
		return car.id === carId;
	});
    const dates = useSelector((state: AppState) => state.dates.dates);

    const rented = useSelector((state: AppState) => state.rented.rented).filter(function (rentedCar) {
		return rentedCar.car_id === carId && rentedCar.status !== 'free' && rentedCar.status !== 'canceled';
	});
    const coeffs = useSelector((state: AppState) => state.coeffs.coeffs);

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
        errStartLocation: false,
        errFinishLocation: false,
    };

    const locatEx: LocationInterface = {
        location_code: '',
        location: '',
        location_ru: '',
        location_ge: '',
    };

    const locations = useSelector((state: AppState) => state.locations.locations);

    const [startLocation, setStartLocation] = useState<LocationInterface>(locatEx);
    const [finishLocation, setFinishLocation] = useState<LocationInterface>(locatEx);

    const [activeStart, setActiveStart] = useState<boolean>(false);
    const [activeFinish, setActiveFinish] = useState<boolean>(false);

    const [active, setActive] = useState<boolean>(false);
    const [error, setError] = useState<BookingErrorInterface>(errData);
    const [freeCarsCounter, setFreeCarsCounter] = useState<number>(checkAvailableCars(car?.counter, rented, dates,
        isStart, startDatetime, finishDatetime));

	if (car) {
        const bookingCarData: BookingInterface = {
            clientName: clientName,
            phone: phone,
            startDate: startDate,
            finishDate: finishDate,
            car: car,
            startLocation: startLocation,
            finishLocation: finishLocation,
        };

		return (
			<>
                <div className={styles.carBooking}>
                    <Input type="text" text={setLocale(router.locale).your_name} value={clientName}
                        error={error.errName} onChange={(e) => setClientName(e.target.value)} />
                    <Input type="phone" text={setLocale(router.locale).phone_number} value={phone}
                        error={error.errPhone} onChange={(e) => setPhone(e.target.value)} />

                    {
                        isStart ?
                            <>
                                <Input type="location" text={startLocation.location_code === '' ? setLocale(router.locale).start_location :
                                    (router.locale === 'en' ? startLocation.location : router.locale === 'ru' ? startLocation.location_ru
                                    : startLocation.location_ge)}
                                    value={router.locale === 'en' ? startLocation.location : router.locale === 'ru' ? startLocation.location_ru
                                    : startLocation.location_ge} error={error.errStartLocation} isActive={startLocation.location_code === '' ? false : true}
                                    onChange={setActiveStart} />
                                <Input type="location" text={finishLocation.location_code === '' ? setLocale(router.locale).finish_location :
                                    (router.locale === 'en' ? finishLocation.location : router.locale === 'ru' ? finishLocation.location_ru
                                    : finishLocation.location_ge)}
                                    value={router.locale === 'en' ? finishLocation.location : router.locale === 'ru' ? finishLocation.location_ru
                                    : finishLocation.location_ge} error={error.errFinishLocation} isActive={finishLocation.location_code === '' ? false : true}
                                    onChange={setActiveFinish} />
                            </>
                        : <></>
                    }
                    
                    <Input type={isStart ? "datetime-local" : "time"} text={setLocale(router.locale).start_time}
                        value={startDate} minDate={getDate(isStart)} error={error.errStart}
                        onChange={isStart ? (e) => {
                            setStartDate(e.target.value);
                            setStartDatetime(e.target.value);
                        } : (e) => setStartDate(e.target.value)} />
                    <Input type={isStart ? "datetime-local" : "time"} text={setLocale(router.locale).finish_time}
                        value={finishDate} minDate={getDate(isStart)} error={error.errFinish}
                        onChange={isStart ? (e) => {
                            setFinishDate(e.target.value);
                            setFinishDatetime(e.target.value);
                        } : (e) => setFinishDate(e.target.value)} />
                    <Htag tag='l' className={styles.carPrice}>
                        {setLocale(router.locale).booking_price + ': ' + setPriceCoeff(car.price, dates, coeffs,
                            isStart, startDatetime, finishDatetime) * 0.1 + '₾'}
                        <Question className={styles.question} onClick={() => setActive(true)}/>
                    </Htag>
                    {
                        !isStart ?
                            <Htag tag='m' className={styles.carCounter}>
                                {setLocale(router.locale).available_cars_left + ': ' + freeCarsCounter}
                            </Htag>
                        : <></>
                    }
                    <Button text={checkAvailableCars(car?.counter, rented, dates,
                        isStart, startDatetime, finishDatetime) > 0 ?
                        setLocale(router.locale).book_car : setLocale(router.locale).no_cars}
                        isActive={checkAvailableCars(car?.counter, rented, dates,
                        isStart, startDatetime, finishDatetime) > 0} isLoading={isLoading}
                        onClick={() => {
                            checkData(bookingCarData, errData, dates, isStart, freeCarsCounter, setIsLoading, setError,
                            setFreeCarsCounter, router);
                        }} />
                </div>
                <Modal active={active} setActive={setActive}>
                    <Htag tag="l" className={styles.questionText}>
                        {setLocale(router.locale).question_booking}
                    </Htag>
                </Modal>
                <Modal active={activeStart} setActive={setActiveStart}>
                    <ModalStart locations={locations} type="start" setLocation={setStartLocation} setActive={setActiveStart}
                        setStartLocation={setStartLocationModal} />
                </Modal>
                <Modal active={activeFinish} setActive={setActiveFinish}>
                    <ModalStart locations={locations} type="finish" setLocation={setFinishLocation} setActive={setActiveFinish}
                        setFinishLocation={setFinishLocationModal} />
                </Modal>
            </>
		);
	} else {
		return <></>
	}
};
