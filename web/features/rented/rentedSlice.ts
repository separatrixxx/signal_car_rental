import { createSlice } from '@reduxjs/toolkit'
import { CarRented } from '../../interfaces/car.interface';


const rentedData: CarRented[] = [];

export const rentedSlice = createSlice({
  name: 'rented',
  initialState: {
    rented: rentedData,
  },
  reducers: {
    setRented: (state, actions) => {
        state.rented = actions.payload
    },
  },
})

export const { setRented } = rentedSlice.actions

export default rentedSlice.reducer;