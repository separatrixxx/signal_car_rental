import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { CarsList } from '../../components/Cars/CarsList/CarsList';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getCars } from '../../helpers/car.helper';
import { Footer } from '../../components/Common/Footer/Footer';
import { CarFilters } from '../../components/Filters/CarFilters/CarFilters';
import { FilterActualInterface, FilterInterface } from '../../interfaces/filters.interface';
import { SortingBar } from '../../components/Filters/SortingBar/SortingBar';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';
import { ModalFilters } from '../../components/Modal/ModalFilters/ModalFilters';
import { useSelector } from 'react-redux';
import { AppState } from '../../features/store/store';
import { StartFilter } from '../../components/Filters/StartFilter/StartFilter';
import { ModalStart } from '../../components/Modal/ModalStart/ModalStart';
import { getLocations } from '../../helpers/location.helper';
import { LocationInterface } from '../../interfaces/location.interface';
import { getPrice } from '../../helpers/price.helper';
import { FiltersBlock } from '../../components/Filters/FiltersBlock/FiltersBlock';
import { MainImage } from '../../components/Common/MainImage/MainImage';
import { HitCarsList } from '../../components/Cars/HitCarsList/HitCarsList';
import { Htag } from '../../components/Common/Htag/Htag';
import { setLocale } from '../../helpers/locale.helper';
import { useRouter } from 'next/router';
import { ModalCurrency } from '../../components/Modal/ModalCurrency/ModalCurrency';


export const MainPage = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [activeLocale, setActiveLocale] = useState<boolean>(false);
    const [activeCurrency, setActiveCurrency] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<boolean>(false);
    const [activeStart, setActiveStart] = useState<boolean>(false);
    const [activeFinish, setActiveFinish] = useState<boolean>(false);

    const [filters, setFilters] = useState<FilterInterface[]>([]);
    const [sort, setSort] = useState<'low' | 'high'>('low');
    const [name, setName] = useState<string>('');

    const [filtersActual, setFiltersActual] = useState<FilterActualInterface>({
        class: '',
        mileage: '',
        engine_type: '',
        transmission: '',
        drive_unit: '',
        hit: '',
    });

    useEffect(() => {
        getLocations(dispatch);
        getPrice(dispatch);
    }, [dispatch]);

    const locations = useSelector((state: AppState) => state.locations.locations);
    const dates = useSelector((state: AppState) => state.dates.dates);

    getCars(dispatch, dates, filtersActual, sort, name);

    const locatEx: LocationInterface = {
        location_code: '',
        location: '',
        location_ru: '',
        location_ge: '',
        location_pl: '',
        location_he: '',
    };

    const [startLocation, setStartLocation] = useState<LocationInterface>(locatEx);
    const [finishLocation, setFinishLocation] = useState<LocationInterface>(locatEx);
    
    return (
        <>
            <Toaster
				position="top-center"
				reverseOrder={true}
				toastOptions={{
					duration: 2000,
				}}
			/>
            <div className={styles.wrapper}>
                <Header isStart={dates.startLocation === ''} setActiveLocale={setActiveLocale} 
                    setActiveCurrency={setActiveCurrency} />
                {
                    dates.startLocation !== ''
                    ?
                        <>
                            <FiltersBlock>
                                <CarFilters filtersActual={filtersActual} setActive={setActiveFilters} setFilters={setFilters} />
                                <SortingBar sort={sort} name={name} setSort={setSort} setName={setName} />
                            </FiltersBlock>
                            <CarsList />
                        </>                        
                    :
                        <div className={styles.mainDiv}>
                            <div className={styles.startFilterDiv}>
                                <MainImage />
                                <StartFilter startLocation={startLocation} finishLocation={finishLocation}
                                    setActiveStart={setActiveStart} setActiveFinish={setActiveFinish} />
                            </div>
                            <Htag tag='xxl' className={styles.hitOffersTitle}>
                                {setLocale(router.locale).hit_offers}
                            </Htag>
                            <HitCarsList isHit={true} />
                            <Htag tag='xxl' className={styles.hitOffersTitle}>
                                {setLocale(router.locale).all_offers}
                            </Htag>
                            <HitCarsList isHit={false} />
                        </div>
                }
                <Footer />
            </div>
			<Modal active={activeLocale} setActive={setActiveLocale}>
                <ModalLanguage setActive={setActiveLocale} />
            </Modal>
            <Modal active={activeCurrency} setActive={setActiveCurrency}>
                <ModalCurrency setActive={setActiveCurrency} />
            </Modal>
            <Modal active={activeFilters} setActive={setActiveFilters}>
                <ModalFilters filters={filters} filtersActual={filtersActual}
                    setActiveFilters={setActiveFilters} setFiltersActual={setFiltersActual} />
            </Modal>
            <Modal active={activeStart} setActive={setActiveStart}>
                <ModalStart locations={locations} setLocation={setStartLocation} setActive={setActiveStart} />
            </Modal>
            <Modal active={activeFinish} setActive={setActiveFinish}>
                <ModalStart locations={locations} setLocation={setFinishLocation} setActive={setActiveFinish} />
            </Modal>
        </>
    );
};
