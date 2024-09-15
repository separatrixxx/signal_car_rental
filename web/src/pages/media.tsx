import { MediaPage } from "../../page_components/MediaPage/MediaPage";
import Head from 'next/head';
import { useRouter } from "next/router";
import { getAddressDescription, setLocale } from "../../helpers/locale.helper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInfo } from "../../helpers/info.helper";
import { useSelector } from 'react-redux';
import { AppState } from "../../features/store/store";
import { setCurrency } from "../../features/currency/currencySlice";
import { getCurrency } from "../../helpers/currency.helper";


function Media(): JSX.Element {
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
        <title>{setLocale(router.locale).signal_car + ' - ' + setLocale(router.locale).media}</title>
        <meta property='description' content={getAddressDescription(router.locale, info).about_locale} />
        <meta property='og:title' content={setLocale(router.locale).signal_car + ' - ' + setLocale(router.locale).media} />
        <meta property='og:description' content={getAddressDescription(router.locale, info).about_locale} />
        <meta charSet="utf-8" />
      </Head>
      <MediaPage />
    </>
  );
}

export default Media;
