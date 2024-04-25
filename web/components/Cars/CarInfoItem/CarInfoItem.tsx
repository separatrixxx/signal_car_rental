import { CarInfoItemProps } from './CarInfoItem.props';
import styles from './CarInfoItem.module.css';
import { Htag } from '../../Common/Htag/Htag';
import { useRouter } from 'next/router';
import cn from 'classnames';


export const CarInfoItem = ({ item, value, type }: CarInfoItemProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.carInfoItem}>
			<Htag tag='l' className={styles.item}>
                {item}
            </Htag>
            <Htag tag='l' className={cn(styles.value, {
                [styles.active]: type,
            })} onClick={() => {
                if (type) {
                    router.push(`${type}:${value}`);
                }
            }}>
                {value}
            </Htag>
		</div>
    );
};
