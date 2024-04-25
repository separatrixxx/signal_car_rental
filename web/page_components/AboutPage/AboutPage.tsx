import styles from './AboutPage.module.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { Footer } from '../../components/Common/Footer/Footer';
import { AboutBlock } from '../../components/About/AboutBlock/AboutBlock';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';


export const AboutPage = (): JSX.Element => {
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
                <AboutBlock />
                <Footer />
            </div>
			<Modal active={active} setActive={setActive}>
                <ModalLanguage setActive={setActive} />
            </Modal>
        </>
    );
};
