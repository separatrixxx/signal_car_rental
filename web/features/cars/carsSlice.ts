import { createSlice } from '@reduxjs/toolkit'
import { CarInterface } from '../../interfaces/car.interface';


const carsData: CarInterface[] = [];

export const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: carsData,
  },
  reducers: {
    setCars: (state, actions) => {
        state.cars = actions.payload
    },
  },
})

export const { setCars } = carsSlice.actions

export default carsSlice.reducer;