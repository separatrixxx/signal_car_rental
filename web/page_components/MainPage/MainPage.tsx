import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { CarsList } from '../../components/Cars/CarsList/CarsList';
import { Header } from '../../components/Header/Header/Header';
import { Modal } from '../../components/Modal/Modal/Modal';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import {  getCars } from '../../helpers/car.helper';
import { Footer } from '../../components/Common/Footer/Footer';
import { CarFilters } from '../../components/Filters/CarFilters/CarFilters';
import { FilterActualInterface, FilterInterface } from '../../interfaces/filters.interface';
import { SortingBar } from '../../components/Filters/SortingBar/SortingBar';
import { ModalLanguage } from '../../components/Modal/ModalLanguage/ModalLanguage';
import { ModaFilters } from '../../components/Modal/ModaFilters/ModaFilters';


export const MainPage = (): JSX.Element => {
    const dispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<boolean>(false);

    const [filters, setFilters] = useState<FilterInterface[]>([]);
    const [sort, setSort] = useState<'low' | 'high'>('low');
    const [name, setName] = useState<string>('');

    const [filtersActual, setFiltersActual] = useState<FilterActualInterface>({
        class: '',
        mileage: '',
        engine_type: '',
        transmission: '',
        drive_unit: '',
    });

    getCars(dispatch, filtersActual, sort, name);
    
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
                <CarFilters filtersActual={filtersActual} setActive={setActiveFilters} setFilters={setFilters} />
                <SortingBar sort={sort} name={name} setSort={setSort} setName={setName} />
                <CarsList />
                <Footer />
            </div>
			<Modal active={active} setActive={setActive}>
                <ModalLanguage setActive={setActive} />
            </Modal>
            <Modal active={activeFilters} setActive={setActiveFilters}>
                <ModaFilters filters={filters} filtersActual={filtersActual}
                    setActiveFilters={setActiveFilters} setFiltersActual={setFiltersActual} />
            </Modal>
        </>
    );
};
