import { createSlice } from '@reduxjs/toolkit'
import { CurrencyRatesInterface } from '../../interfaces/currency.interface';


const ratesData: CurrencyRatesInterface = {
    eur: 1,
    usd: 1,
    rub: 1,
    gel: 1,
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    rates: ratesData,
  },
  reducers: {
    setRates: (state, actions) => {
        state.rates = actions.payload
    },
  },
})

export const { setRates } = ratesSlice.actions

export default ratesSlice.reducer;