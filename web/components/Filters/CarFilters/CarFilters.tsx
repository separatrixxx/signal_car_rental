import { CarFiltersProps } from './CarFilters.props';
import styles from './CarFilters.module.css';
import { useRouter } from 'next/router';
import { setLocale } from '../../../helpers/locale.helper';
import { FilterItem } from '../FilterItem/FilterItem';


export const CarFilters = ({ filtersActual, setActive, setFilters }: CarFiltersProps): JSX.Element => {
	const router = useRouter();

	return (
		<div className={styles.filtersBlock}>
			<FilterItem text={setLocale(router.locale).class} filters={[
					{
						name: 'class',
						value: 'econom',
						text: setLocale(router.locale).econom,
					},
					{
						name: 'class',
						value: 'comfort',
						text: setLocale(router.locale).comfort,
					},
					{
						name: 'class',
						value: 'business',
						text: setLocale(router.locale).business,
					},
					{
						name: 'class',
						value: 'premium',
						text: setLocale(router.locale).premium,
					},
					{
						name: 'class',
						value: 'suv',
						text: setLocale(router.locale).suv,
					},
					{
						name: 'class',
						value: 'minivan',
						text: setLocale(router.locale).minivan,
					},
				]} filtersActual={filtersActual} filterType='class' setActive={setActive} setFilters={setFilters} />
			<FilterItem text={setLocale(router.locale).fuel_type} filters={[
					{
						name: 'engine_type',
						value: 'gasoline',
						text: setLocale(router.locale).gasoline,
					},
					{
						name: 'engine_type',
						value: 'diesel',
						text: setLocale(router.locale).diesel,
					},
					{
						name: 'engine_type',
						value: 'hybrid',
						text: setLocale(router.locale).hybrid,
					},
					{
						name: 'engine_type',
						value: 'electricity',
						text: setLocale(router.locale).electricity,
					},
				]} filtersActual={filtersActual} filterType='engine_type' setActive={setActive} setFilters={setFilters} />
			<FilterItem text={setLocale(router.locale).transmission} filters={[
					{
						name: 'transmission',
						value: 'automatic',
						text: setLocale(router.locale).automatic,
					},
					{
						name: 'transmission',
						value: 'manual',
						text: setLocale(router.locale).manual,
					},
				]} filtersActual={filtersActual} filterType='transmission' setActive={setActive} setFilters={setFilters} />
			<FilterItem text={setLocale(router.locale).drive_unit} filters={[
					{
						name: 'drive_unit',
						value: 'front_wheel',
						text: setLocale(router.locale).front_wheel,
					},
					{
						name: 'drive_unit',
						value: 'rear',
						text: setLocale(router.locale).rear,
					},
				]} filtersActual={filtersActual} filterType='drive_unit' setActive={setActive} setFilters={setFilters} />
		</div>
	);
};
