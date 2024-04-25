import { SortingBarProps } from './SortingBar.props';
import styles from './SortingBar.module.css';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { Htag } from '../../Common/Htag/Htag';
import SortIcon from './sort_icon.svg';
import { Input } from '../../Common/Input/Input';
import cn from 'classnames';


export const SortingBar = ({ sort, name, setSort, setName }: SortingBarProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.sortingBar}>
            <div className={styles.sortingDiv}>
                <span className={cn(styles.sortIcon, {
                        [styles.sortLow]: sort === 'low',
                })}>
                    <SortIcon />
                </span>
                <Htag tag='m' onClick={() => sort === 'low' ? setSort('high') : setSort('low')}>
                    {sort === 'low' ? setLocale(router.locale).by_low_price : setLocale(router.locale).by_high_price}
                </Htag>
            </div>
            <Input type="text" text={setLocale(router.locale).search + '...'} value={name}
                error={false} isSearch={true} onChange={(e) => setName(e.target.value)} />
        </div>
    );
};

