import styles from './AboutBlock.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';


export const AboutBlock = (): JSX.Element => {
    const router = useRouter();
    
    const info = useSelector((state: AppState) => state.info.info);
    
	return (
        <div className={styles.aboutBlock}>
            <Htag tag='xl' className={styles.about_title}>
                {setLocale(router.locale).about}
            </Htag>
            <Htag tag='l' className={styles.about_text}>
                {router.locale === 'en' ? info.about_text : router.locale === 'ru' ? info.about_text_ru : info.about_text_ge}
            </Htag>
        </div>
    );
};