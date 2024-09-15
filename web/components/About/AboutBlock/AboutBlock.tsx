import styles from './AboutBlock.module.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { Htag } from '../../Common/Htag/Htag';
import { getAddressDescription, setLocale } from '../../../helpers/locale.helper';
import ReactMarkdown from 'react-markdown';


export const AboutBlock = (): JSX.Element => {
    const router = useRouter();
    
    const info = useSelector((state: AppState) => state.info.info);
    
	return (
        <div className={styles.aboutBlock}>
            <Htag tag='xl' className={styles.about_title}>
                {setLocale(router.locale).about}
            </Htag>
            <Htag tag='l' className={styles.about_text}>
                <ReactMarkdown>
                    {getAddressDescription(router.locale, info).about_locale}
                </ReactMarkdown>
            </Htag>
        </div>
    );
};