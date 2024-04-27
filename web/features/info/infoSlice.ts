import { createSlice } from '@reduxjs/toolkit'
import { InfoInterface } from '../../interfaces/info.interface';


const infoData: InfoInterface = {
  about_text: '',
  about_text_ru: '',
  about_text_ge: '',
  phone: '',
  email: '',
  address: '',
  address_ru: '',
  address_ge: '',
  location: '',
};

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    info: infoData,
  },
  reducers: {
    setInfo: (state, actions) => {
        state.info = actions.payload
    },
  },
})

export const { setInfo } = infoSlice.actions

export default infoSlice.reducer;