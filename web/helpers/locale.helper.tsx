import { en } from "../locales/en.locale";
import { ka } from "../locales/ka.locale";
import { ru } from "../locales/ru.locale";
import { pl } from "../locales/pl.locale";
import { he } from "../locales/he.locale";
import { InfoInterface, InfoLocale } from "../interfaces/info.interface";
import { CarInterface } from "../interfaces/car.interface";
import { LocationInterface } from "../interfaces/location.interface";


type localeType = typeof en | typeof ru | typeof ka | typeof pl | typeof he;

export function setLocale(locale: string | undefined): localeType {
    switch (locale) {
        case 'ru':
            return ru;
        case 'ka':
            return ka;
        case 'pl':
            return pl;
        case 'he':
            return he;
        default:
            return en;
    }
}

export function getLanguages(router: any): localeType[] {
    const languages = [en, ru, ka, pl, he];
    const langIndex = languages.indexOf(setLocale(router.locale));

    if (langIndex !== -1) {
        languages.splice(langIndex, 1);
    }

    return languages;
}

export function getAddressDescription(locale: string | undefined, info: InfoInterface): InfoLocale {
    switch (locale) {
        case 'ru':
            return {
                about_locale: info.about_text_ru,
                address_locale: info.address_ru,
            };
        case 'ka':
            return {
                about_locale: info.about_text_ge,
                address_locale: info.address_ge,
            };
        case 'pl':
            return {
                about_locale: info.about_text_pl,
                address_locale: info.address_pl,
            };
        case 'he':
            return {
                about_locale: info.about_text_he,
                address_locale: info.address_he,
            };
        default:
            return {
                about_locale: info.about_text,
                address_locale: info.address,
            };
    }
}

export function getCarDescription(locale: string | undefined, car: CarInterface): string {
    switch (locale) {
        case 'ru':
            return car.description_ru;
        case 'ka':
            return car.description_ge;
        case 'pl':
            return car.description_pl;
        case 'he':
            return car.description_he;
        default:
            return car.description;
    }
}

export function getLocaleLocation(locale: string | undefined, location: LocationInterface): string {
    switch (locale) {
        case 'ru':
            return location.location_ru;
        case 'ka':
            return location.location_ge;
        case 'pl':
            return location.location_pl;
        case 'he':
            return location.location_he;
        default:
            return location.location;
    }
}

export function getLocaleLocations(locale: string | undefined): string {
    switch (locale) {
        case 'ru':
            return 'location_ru';
        case 'ka':
            return 'location_ge';
        case 'pl':
            return 'location_pl';
        case 'he':
            return 'location_he';
        default:
            return 'location';
    }
}
