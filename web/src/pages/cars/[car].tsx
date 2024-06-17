import Head from 'next/head';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { CarData, Cars } from '../../../interfaces/car.interface';
import { CarPage } from '../../../page_components/CarPage/CarPage';
import { setLocale } from '../../../helpers/locale.helper';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCars } from '../../../helpers/car.helper';
import { getLocations } from '../../../helpers/location.helper';
import { getPrice } from '../../../helpers/price.helper';
import { useSelector } from 'react-redux';
import { AppState } from '../../../features/store/store';
import { getRented } from '../../../helpers/rented.helper';
import { setCurrency } from '../../../features/currency/currencySlice';
import { getCurrency, getRates } from '../../../helpers/currency.helper';


export default function Car({ car }: CarProps) {
    const router = useRouter();
	const dispatch = useDispatch();

	const dates = useSelector((state: AppState) => state.dates.dates);

	useEffect(() => {
		getLocations(dispatch);
    	getPrice(dispatch);
		getCars(dispatch, dates);
		getRented(dispatch);
		getRates(dispatch);
		dispatch(setCurrency(getCurrency()));
	}, [dispatch, dates]);

	if (car) {
		return (
			<>
				<Head>
					<title>{setLocale(router.locale).signal_car + ' - ' + car.data.name}</title>
					<meta name='description' content={setLocale(router.locale).signal_car + ' - ' + (router.locale === 'ka' 
						? car.data.description_ge : router.locale === 'ru' ? car.data.description_ru : car.data.description)} />
					<meta property='og:title' content={setLocale(router.locale).signal_car + ' - ' + car.data.name} />
					<meta name='og:description' content={setLocale(router.locale).signal_car + ' - ' + (router.locale === 'ka' 
						? car.data.description_ge : router.locale === 'ru' ? car.data.description_ru : car.data.description)} />
					<meta charSet="utf-8" />
				</Head>
				<CarPage carId={car.data.id} isStart={dates.startLocation === '' ? true : false} />
			</>
		);
	} else {
		return <></>
	}
}

export const getServerSideProps: GetServerSideProps<CarProps> = async ({ params }) => {
    if (!params) {
        return {
            notFound: true
        };
    }
    try {
        const { data: car }: AxiosResponse<CarData> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/api/cars/' + params.car);

		return {
			props: {
				car
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface CarProps extends Record<string, unknown> {
	car: CarData;
}
