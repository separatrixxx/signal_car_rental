import { CarPricesItemProps } from './CarPricesItem.props';
import styles from './CarPricesItem.module.css';
import { Htag } from '../../Common/Htag/Htag';
import cn from 'classnames';


export const CarPricesItem = ({ text, price, isActive }: CarPricesItemProps): JSX.Element => {       
    return (
        <div className={cn(styles.carPricesItem, {
            [styles.active]: isActive,
        })}>
            <Htag tag='m' className={styles.text}>
                {text}
            </Htag>
            <Htag tag='m' className={styles.price}>
                {price}
            </Htag>
        </div>
    );
};
