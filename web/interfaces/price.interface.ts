export interface PriceData {
    data: PriceInterface[],
}

export interface PriceInterface {
    price: number,
    start_location: string,
    finish_location: string,
}

export interface PriceCoeffsInterface {
    coeff1: number,
    coeff2: number,
    coeff3: number,
}
