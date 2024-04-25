import { ModalLanguageProps } from './ModalLanguage.props';
import styles from './ModalLanguage.module.css';
import Link from 'next/link';
import { getLanguages } from '../../../helpers/locale.helper';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';


export const ModalLanguage = ({ setActive }: ModalLanguageProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.blockLanguages}>
            {getLanguages(router).map(m => (
                <Link key={m.locale} href={router.asPath} locale={m.locale} className={styles.link}
                    onClick={() => {
						setActive(false);
					}}>
                    <Htag tag='l' className={styles.langLink}>
						{m.language}
					</Htag>
                </Link>
            ))}
        </div>
    );
};