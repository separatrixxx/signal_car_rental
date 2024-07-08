import axios, { AxiosResponse } from "axios";
import { CurrencyPairInterface, CurrencyRatesInterface } from "../interfaces/currency.interface";
import { setRates } from "../features/rates/ratesSlice";

export const EUR = { symbol: '€', code: 'EUR' };
export const USD = { symbol: '$', code: 'USD' };
export const RUB = { symbol: '₽', code: 'RUB' };
export const GEL = { symbol: '₾', code: 'GEL' };

export type CurrencyType = typeof EUR | typeof USD | typeof RUB | typeof GEL;

export function setCurrencyLS(currency: string) {
    localStorage.setItem('currency', currency);
}

export function getCurrency(): CurrencyType {
    const currency = localStorage.getItem('currency');

    switch (currency) {
        case 'USD':
            return USD;
        case 'GEL':
            return RUB;
        case 'GEL':
            return RUB;
        default:
            return EUR;
    }
}

export async function getRates(dispatch: any) {
    try {
        const { data : response }: AxiosResponse<any> = await axios.get('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json');

        const codes: string[] = ['EUR', 'USD', 'RUB'];
        const rates: any[] = response[0].currencies.filter((r: any) => codes.includes(r.code));
        const rateEUR: CurrencyPairInterface = {
            rate: rates.find(r => r.code === 'EUR').rate,
            quantity: rates.find(r => r.code === 'EUR').quantity,
        };
        const rateUSD: CurrencyPairInterface = {
            rate: rates.find(r => r.code === 'USD').rate,
            quantity: rates.find(r => r.code === 'USD').quantity,
        };
        const rateRUB: CurrencyPairInterface = {
            rate: rates.find(r => r.code === 'RUB').rate,
            quantity: rates.find(r => r.code === 'RUB').quantity,
        };

        const currencyRates: CurrencyRatesInterface = {
            eur: (rateEUR.quantity / rateEUR.rate) * rateEUR.rate,
            usd: (rateUSD.quantity / rateUSD.rate) * rateEUR.rate,
            rub: (rateRUB.quantity / rateRUB.rate) * rateEUR.rate,
            gel: rateEUR.rate,
        };

        dispatch(setRates(currencyRates));
    } catch (err) {
        console.log(err);
    }
}
