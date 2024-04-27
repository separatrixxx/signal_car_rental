import { createSlice } from '@reduxjs/toolkit'
import { LocationInterface } from '../../interfaces/location.interface';


const locationsData: LocationInterface[] =[];

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: locationsData,
  },
  reducers: {
    setLocations: (state, actions) => {
        state.locations = actions.payload
    },
  },
})

export const { setLocations } = locationsSlice.actions

export default locationsSlice.reducer;