import { createSlice } from '@reduxjs/toolkit'
import { PriceCoeffsInterface } from '../../interfaces/price.interface';


const coeffsData: PriceCoeffsInterface ={
    coeff1: 1,
    coeff2: 1,
    coeff3: 1,
};

export const coeffsSlice = createSlice({
  name: 'coeffs',
  initialState: {
    coeffs: coeffsData,
  },
  reducers: {
    setCoeffs: (state, actions) => {
        state.coeffs = actions.payload
    },
  },
})

export const { setCoeffs } = coeffsSlice.actions

export default coeffsSlice.reducer;