import { ModalCurrencyProps } from './ModalCurrency.props';
import styles from './ModalCurrency.module.css';
import { Htag } from '../../Common/Htag/Htag';
import { CurrencyType, EUR, GEL, RUB, USD, setCurrencyLS } from '../../../helpers/currency.helper';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../../../features/currency/currencySlice';
import { AppState } from '../../../features/store/store';
import { useSelector } from 'react-redux';


export const ModalCurrency = ({ setActive }: ModalCurrencyProps): JSX.Element => {
    const dispatch = useDispatch();
    
    const currency = useSelector((state: AppState) => state.currency.currency);

    const currencyAll: CurrencyType[] = [EUR, USD, RUB, GEL];
    
    const handleCurrencyChange = (currency: CurrencyType) => {
        setCurrencyLS(currency.code);
        dispatch(setCurrency(currency));
        setActive(false);
    };

    return (
        <div className={styles.blockCurrency}>
            {currencyAll.filter(c => c !== currency).map(c => (
                <div key={c.code} className={styles.link}
                    onClick={() => handleCurrencyChange(c)}>
                    <Htag tag='l' className={styles.currencyLink}>
                        {c.symbol + ' ' + c.code}
                    </Htag>
                </div>
            ))}
        </div>
    );
};
