import styles from './ContactsMap.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';


export const ContactsMap = (): JSX.Element => {
    const router = useRouter();
    
    const info = useSelector((state: AppState) => state.info.info);
    
	return (
        <div className={styles.contactsMap}>
            <iframe src={info.location} width="100%" height="100%" loading="lazy"></iframe>
        </div>
    );
};
