export interface PriceData {
    data: PriceInterface[],
}

export interface PriceInterface {
    price: number,
    start_location: string,
    finish_location: string,
}
