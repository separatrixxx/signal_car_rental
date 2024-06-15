import styles from './ContactsPage.module.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { Footer } from '../../components/Common/Footer/Footer';
import { ContactsBlock } from '../../components/Contacts/ContactsBlock/ContactsBlock';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';
import { ModalCurrency } from '../../components/Modal/ModalCurrency/ModalCurrency';


export const ContactsPage = (): JSX.Element => {
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
                <ContactsBlock />
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
