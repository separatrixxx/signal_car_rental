export interface InfoData {
    data: InfoInterface[],
}

export interface InfoInterface {
    about_text: string,
    about_text_ru: string,
    about_text_ge: string,
    about_text_pl: string,
    about_text_he: string,
    phone: string,
    email: string,
    address: string,
    address_ru: string,
    address_ge: string,
    address_pl: string,
    address_he: string,
    location: string,
}

export interface InfoLocale {
    about_locale: string,
    address_locale: string,
}
