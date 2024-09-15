import { SortingBarProps } from './SortingBar.props';
import styles from './SortingBar.module.css';
import { useRouter } from 'next/router';
import { getLocaleLocations, setLocale } from '../../../helpers/locale.helper';
import { Htag } from '../../Common/Htag/Htag';
import SortIcon from './sort_icon.svg';
import LocationIcon from './location_icon.svg';
import { Input } from '../../Common/Input/Input';
import { useDispatch } from "react-redux";
import { setDates } from '../../../features/dates/datesSlice';
import { DatesInterface } from '../../../interfaces/dates.interface';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import cn from 'classnames';


export const SortingBar = ({ sort, name, setSort, setName }: SortingBarProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const dates = useSelector((state: AppState) => state.dates.dates);
    const locations = useSelector((state: AppState) => state.locations.locations);

    const datesData: DatesInterface = {
        startLocation: '',
        finishLocation: '',
        startDate: '',
        finishDate: '',
    };
    
    return (
        <div className={styles.sortingBar}>
            <div className={styles.sortingDiv} onClick={()=> dispatch(setDates(datesData))}>
                <span className={styles.sortIcon}>
                    <LocationIcon />
                </span>
                <Htag tag='m'>
                    {locations.filter(l => l.location_code === dates.startLocation)[0][getLocaleLocations(router.locale) as 'location']}
                </Htag>
            </div>
            <div className={styles.sortingDiv} onClick={() => sort === 'low' ? setSort('high') : setSort('low')}>
                <span className={cn(styles.sortIcon, {
                        [styles.sortLow]: sort === 'low',
                })}>
                    <SortIcon />
                </span>
                <Htag tag='m'>
                    {sort === 'low' ? setLocale(router.locale).by_low_price : setLocale(router.locale).by_high_price}
                </Htag>
            </div>
            <Input type="text" text={setLocale(router.locale).search + '...'} value={name}
                error={false} isSearch={true} onChange={(e) => setName(e.target.value)} />
        </div>
    );
};

