import { CarPageProps } from './CarPage.props';
import styles from './CarPage.module.css';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { CarInfo } from '../../components/Cars/CarInfo/CarInfo';
import { CarBooking } from '../../components/Cars/CarBooking/CarBooking';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { Footer } from '../../components/Common/Footer/Footer';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';


export const CarPage = ({ carId }: CarPageProps): JSX.Element => {
	const [active, setActive] = useState<boolean>(false);
	
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
				<Header setActive={setActive} />
                <div className={styles.carBlock}>
                    <CarInfo carId={carId} />
					<CarBooking carId={carId} />
                </div>
				<Footer />
			</div>
			<Modal active={active} setActive={setActive}>
                <ModalLanguage setActive={setActive} />
            </Modal>
		</>
	);
};
