import { ModalStartProps } from './ModalStart.props';
import styles from './ModalStart.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';


export const ModalStart = ({ locations, setLocation, setActive }: ModalStartProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.blockFilters}>
            {locations.map(l => (
                <Htag key={l.location_code} tag='l' className={styles.filterLink} onClick={() => {
                    setLocation(l);
                    setActive(false);
                }}>
                    {router.locale === 'en' ? l.location : router.locale === 'ru' ? l.location_ru : l.location_ge}
                </Htag>
            ))}
        </div>
    );
};
