import { LocaleChangeProps } from './LocaleChange.props';
import styles from './LocaleChange.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import { AppState } from '../../../features/store/store';
import { useSelector } from 'react-redux';


export const LocaleChange = ({ isCurrency, setActiveLocale, setActiveCurrency }: LocaleChangeProps): JSX.Element => {
    const router = useRouter();

    const currency = useSelector((state: AppState) => state.currency.currency);

    return (
        <Htag tag='m' className={styles.lang} onClick={() => {
            if (!isCurrency) {
                setActiveLocale(true);
            } else {
                setActiveCurrency(true);
            }
        }}>
            {
                !isCurrency ? setLocale(router.locale).lang : currency.code
            }
        </Htag>
    );
};
