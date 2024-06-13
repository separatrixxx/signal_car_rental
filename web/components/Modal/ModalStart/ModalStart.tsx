import { ModalStartProps } from './ModalStart.props';
import styles from './ModalStart.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { useDispatch } from "react-redux";
import { setDates } from '../../../features/dates/datesSlice';


export const ModalStart = ({ locations, type, setLocation, setActive, setStartLocation, setFinishLocation }:
    ModalStartProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const dates = useSelector((state: AppState) => state.dates.dates);
    
    return (
        <div className={styles.blockFilters}>
            {locations.map(l => (
                <Htag key={l.location_code} tag='l' className={styles.filterLink} onClick={() => {
                    setLocation(l);
                    setActive(false);

                    if (type === 'start' && setStartLocation) {
                        setStartLocation(l.location_code);
                    } else if (type === 'finish' && setFinishLocation) {
                        setFinishLocation(l.location_code);
                    }
                }}>
                    {router.locale === 'ka' ? l.location_ge : router.locale === 'ru' ? l.location_ru : l.location}
                </Htag>
            ))}
        </div>
    );
};
