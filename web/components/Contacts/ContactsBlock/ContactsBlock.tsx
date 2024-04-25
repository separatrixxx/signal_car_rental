import styles from './ContactsBlock.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import { CarInfoItem } from '../../Cars/CarInfoItem/CarInfoItem';
import { ContactsMap } from '../ContactsMap/ContactsMap';


export const ContactsBlock = (): JSX.Element => {
    const router = useRouter();
    
    const info = useSelector((state: AppState) => state.info.info);
    
	return (
        <div className={styles.contactsBlock}>
            <Htag tag='xl' className={styles.contacts_title}>
                {setLocale(router.locale).contacts}
            </Htag>
            <div className={styles.infoDiv}>
                <CarInfoItem item={setLocale(router.locale).phone + ':'} value={info.phone} type='tel' />
                <CarInfoItem item={setLocale(router.locale).email + ':'} value={info.email} type='mailto' />
                <CarInfoItem item={setLocale(router.locale).address + ':'} 
                    value={router.locale === 'en' ? info.address : router.locale === 'ru' ? info.address_ru : info.address_ge} />
                <ContactsMap />
            </div>
        </div>
    );
};