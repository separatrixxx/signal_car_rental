import { createSlice } from '@reduxjs/toolkit'
import { PriceInterface } from '../../interfaces/price.interface';


const priceData: PriceInterface[] =[];

export const priceSlice = createSlice({
  name: 'price',
  initialState: {
    price: priceData,
  },
  reducers: {
    setPrice: (state, actions) => {
        state.price = actions.payload
    },
  },
})

export const { setPrice } = priceSlice.actions

export default priceSlice.reducer;