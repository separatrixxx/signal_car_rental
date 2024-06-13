import { en } from "../locales/en.locale";
import { ka } from "../locales/ka.locale";
import { ru } from "../locales/ru.locale";
import { pl } from "../locales/pl.locale";


type localeType = typeof en | typeof ru | typeof ka | typeof pl;

export function setLocale(locale: string | undefined): localeType {
    switch (locale) {
        case 'ru':
            return ru;
        case 'ka':
            return ka;
        case 'pl':
            return pl;
        default:
            return en;
    }
}

export function getLanguages(router: any): localeType[] {
    const languages = [en, ru, ka, pl];
    const langIndex = languages.indexOf(setLocale(router.locale));

    if (langIndex !== -1) {
        languages.splice(langIndex, 1);
    }

    return languages;
}
