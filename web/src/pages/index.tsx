import { MainPage } from "../../page_components/MainPage/MainPage";
import Head from 'next/head';
import { useRouter } from "next/router";
import { setLocale } from "../../helpers/locale.helper";
import { useSelector } from 'react-redux';
import { AppState } from "../../features/store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInfo } from "../../helpers/info.helper";
import { getRented } from "../../helpers/rented.helper";
import { setCurrency } from "../../features/currency/currencySlice";
import { getCurrency, getRates } from "../../helpers/currency.helper";


function Main(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getInfo(dispatch);
    getRented(dispatch);
    getRates(dispatch);
    dispatch(setCurrency(getCurrency()));
  }, [dispatch]);

  const info = useSelector((state: AppState) => state.info.info);

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).signal_car}</title>
        <meta name='description' content={router.locale === 'ka' 
					? info.about_text_ge : router.locale === 'ru' ? info.about_text_ru : info.about_text} />
        <meta property='og:title' content={setLocale(router.locale).signal_car} />
        <meta name='og:description' content={router.locale === 'ka' 
					? info.about_text_ge : router.locale === 'ru' ? info.about_text_ru : info.about_text} />
        <meta charSet="utf-8" />
      </Head>
      <MainPage />
    </>
  );
}

export default Main;
