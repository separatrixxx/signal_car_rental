import { AboutPage } from "../../page_components/AboutPage/AboutPage";
import Head from 'next/head';
import { useRouter } from "next/router";
import { setLocale } from "../../helpers/locale.helper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInfo } from "../../helpers/info.helper";
import { useSelector } from 'react-redux';
import { AppState } from "../../features/store/store";
import { setCurrency } from "../../features/currency/currencySlice";
import { getCurrency } from "../../helpers/currency.helper";


function About(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getInfo(dispatch);
    dispatch(setCurrency(getCurrency()));
  }, [dispatch]);

  const info = useSelector((state: AppState) => state.info.info);

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).signal_car + ' - ' + setLocale(router.locale).about}</title>
        <meta name='description' content={router.locale === 'ka' 
					? info.about_text_ge : router.locale === 'ru' ? info.about_text_ru : info.about_text} />
        <meta property='og:title' content={setLocale(router.locale).signal_car + ' - ' + setLocale(router.locale).about} />
        <meta name='description' content={router.locale === 'ka' 
					? info.about_text_ge : router.locale === 'ru' ? info.about_text_ru : info.about_text} />
        <meta charSet="utf-8" />
      </Head>
      <AboutPage />
    </>
  );
}

export default About;
