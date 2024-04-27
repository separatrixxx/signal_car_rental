import { createSlice } from '@reduxjs/toolkit'
import { DatesInterface } from '../../interfaces/dates.interface';


const datesData: DatesInterface = {
  startLocation: '',
  finishLocation: '',
  startDate: '',
  finishDate: '',
};

export const datesSlice = createSlice({
  name: 'dates',
  initialState: {
    dates: datesData,
  },
  reducers: {
    setDates: (state, actions) => {
        state.dates = actions.payload
    },
  },
})

export const { setDates } = datesSlice.actions

export default datesSlice.reducer;