import { CarPageProps } from './CarPage.props';
import styles from './CarPage.module.css';
import { Toaster } from 'react-hot-toast';
import { CarInfo } from '../../components/Cars/CarInfo/CarInfo';
import { CarBooking } from '../../components/Cars/CarBooking/CarBooking';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { Footer } from '../../components/Common/Footer/Footer';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';
import { ModalCurrency } from '../../components/Modal/ModalCurrency/ModalCurrency';


export const CarPage = ({ carId, isStart }: CarPageProps): JSX.Element => {
	const [activeLocale, setActiveLocale] = useState<boolean>(false);
    const [activeCurrency, setActiveCurrency] = useState<boolean>(false);

	const [startDatetime, setStartDatetime] = useState<string>('');
	const [finishDatetime, setFinishDatetime] = useState<string>('');
	const [startLocation, setStartLocation] = useState<string>('');
	const [finishLocation, setFinishLocation] = useState<string>('');
	
	return (
		<>
			<Toaster
				position="top-center"
				reverseOrder={true}
				toastOptions={{
					duration: 2000,
				}}
			/>
			<div className={styles.wrapper}>
				<Header setActiveLocale={setActiveLocale} setActiveCurrency={setActiveCurrency} />
                <div className={styles.carBlock}>
                    <CarInfo carId={carId} isStart={isStart} startDatetime={startDatetime} finishDatetime={finishDatetime}
						startLocation={startLocation} finishLocation={finishLocation} />
					<CarBooking carId={carId} isStart={isStart} startDatetime={startDatetime} finishDatetime={finishDatetime}
						setStartDatetime={setStartDatetime} setFinishDatetime={setFinishDatetime}
						setStartLocationModal={setStartLocation} setFinishLocationModal={setFinishLocation} />
                </div>
				<Footer />
			</div>
			<Modal active={activeLocale} setActive={setActiveLocale}>
                <ModalLanguage setActive={setActiveLocale} />
            </Modal>
            <Modal active={activeCurrency} setActive={setActiveCurrency}>
                <ModalCurrency setActive={setActiveCurrency} />
            </Modal>
		</>
	);
};
