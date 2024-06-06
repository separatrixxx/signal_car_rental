export interface FilterInterface {
    name: 'class' | 'mileage' | 'engine_type' | 'transmission' | 'drive_unit',
    value: string,
    text: string,
}

export interface FilterActualInterface {
    class: string,
    mileage: string,
    engine_type: string,
    transmission: string,
    drive_unit: string,
    hit: string,
}
