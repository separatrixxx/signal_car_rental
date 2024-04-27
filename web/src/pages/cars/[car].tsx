import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
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


export default function Car({ car }: CarProps) {
    const router = useRouter();
	const dispatch = useDispatch();

	const dates = useSelector((state: AppState) => state.dates.dates);

	useEffect(() => {
		getLocations(dispatch);
    	getPrice(dispatch);
		getCars(dispatch, dates, router);
	}, [dispatch, dates, router]);

	if (car && dates.startLocation !== '') {
		return (
			<>
				<Head>
					<title>{setLocale(router.locale).signal_car + ' - ' + car.data.name}</title>
					<meta name='description' content={setLocale(router.locale).signal_car + ' - ' + (router.locale === 'en' 
						? car.data.description : router.locale === 'ru' ? car.data.description_ru : car.data.description_ge)} />
					<meta property='og:title' content={setLocale(router.locale).signal_car + ' - ' + car.data.name} />
					<meta name='og:description' content={setLocale(router.locale).signal_car + ' - ' + (router.locale === 'en' 
						? car.data.description : router.locale === 'ru' ? car.data.description_ru : car.data.description_ge)} />
					<meta charSet="utf-8" />
				</Head>
				<CarPage carId={car.data.id} />
			</>
		);
	} else {
		return <></>
	}
}

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPropsContext<ParsedUrlQuery>) => {		
     const paths: any[] = [];
	 
	for (const locale of locales as []) {
		const { data: response }: AxiosResponse<Cars> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
			'/api/cars?populate=images%2C%20location');

		response.data.map(car => {
            return paths.push({
                params: { car: '' + car.id },
                locale,
            });
        });
	}

	return {
		paths: paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<CarProps> = async ({ params, locale }: GetStaticPropsContext<ParsedUrlQuery>) => {
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
