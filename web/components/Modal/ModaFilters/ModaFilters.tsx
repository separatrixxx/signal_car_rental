import { ModaFiltersProps } from './ModaFilters.props';
import styles from './ModaFilters.module.css';
import { setLocale } from '../../../helpers/locale.helper';
import { useRouter } from 'next/router';
import { Htag } from '../../Common/Htag/Htag';
import { FilterActualInterface } from '../../../interfaces/filters.interface';


export const ModaFilters = ({ filters, filtersActual, setActiveFilters, setFiltersActual }: ModaFiltersProps): JSX.Element => {
    const router = useRouter();
    
    return (
        <div className={styles.blockFilters}>
            {filters.map(f => (
                <Htag key={f.value} tag='l' className={styles.filterLink} onClick={() => {
                    setActiveFilters(false);

                    let newfilters: FilterActualInterface = filtersActual;

                    newfilters[f.name] = f.value;
                            
                    setFiltersActual(newfilters);
                }}>
                    {f.text}
                </Htag>
            ))}
            <span className={styles.divider} />
            <Htag tag='l' className={styles.filterLink} onClick={() => {
                setActiveFilters(false);

                let newfilters: FilterActualInterface = filtersActual;

                newfilters[filters[0].name] = '';
                            
                setFiltersActual(newfilters);
            }}>
                {setLocale(router.locale).cancel}
            </Htag>
        </div>
    );
};
