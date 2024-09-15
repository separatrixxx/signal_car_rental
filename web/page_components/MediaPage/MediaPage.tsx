import styles from './MediaPage.module.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { Footer } from '../../components/Common/Footer/Footer';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';
import { ModalCurrency } from '../../components/Modal/ModalCurrency/ModalCurrency';
import { Htag } from '../../components/Common/Htag/Htag';
import { setLocale } from '../../helpers/locale.helper';
import { useRouter } from 'next/router';


export const MediaPage = (): JSX.Element => {
    const router = useRouter();

    const [activeLocale, setActiveLocale] = useState<boolean>(false);
    const [activeCurrency, setActiveCurrency] = useState<boolean>(false);

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
                <br />
                <br />
                <br />
                <br />
                <br />
                <Htag tag='xl'>
                    {setLocale(router.locale).media}
                </Htag>
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
