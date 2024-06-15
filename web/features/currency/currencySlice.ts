import { createSlice } from '@reduxjs/toolkit'
import { CurrencyType, EUR } from '../../helpers/currency.helper';


const currencyData: CurrencyType = EUR;

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: currencyData,
  },
  reducers: {
    setCurrency: (state, actions) => {
        state.currency = actions.payload
    },
  },
})

export const { setCurrency } = currencySlice.actions

export default currencySlice.reducer;