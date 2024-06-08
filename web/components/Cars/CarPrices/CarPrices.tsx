import { CarPricesProps } from './CarPrices.props';
import styles from './CarPrices.module.css';
import { Htag } from '../../Common/Htag/Htag';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { CarPricesItem } from '../CarPricesItem/CarPricesItem';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { getDaysNum } from '../../../helpers/price.helper';
import { useEffect, useState } from 'react';


export const CarPrices = ({ price, isStart, startDatetime, finishDatetime }: CarPricesProps): JSX.Element => {
    const router = useRouter();

    const dates = useSelector((state: AppState) => state.dates.dates);

    const priceArray = Object.values(price);

    const textPrices: string[] = ['1 ' + setLocale(router.locale).day1, '2-3 ' + setLocale(router.locale).day2,
        '4-9 ' + setLocale(router.locale).day3, '10-25 ' + setLocale(router.locale).day3,
        '25+ ' + setLocale(router.locale).day3
    ];
    const numPrices: number[] = [1, 2, 4, 10, 26];

    const [daysNum, setDaysNum] = useState<number>(1);
    
    useEffect(() => {
        getDaysNum(dates, isStart, startDatetime, finishDatetime, setDaysNum);
    }, [dates, isStart, startDatetime, finishDatetime]);
    
    return (
        <div className={styles.carPrices}>
			{priceArray.map((p, i) => (
                <CarPricesItem key={p} text={textPrices[i] + ':'} price={p + '₾ / ' + setLocale(router.locale).day}
                    isActive={daysNum >= numPrices[i]
                        && (daysNum < numPrices[i + 1]
                        || numPrices[i + 1] === undefined)
                    } />
            ))}
		</div>
    );
};
