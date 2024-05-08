import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import carsSlice from "../cars/carsSlice";
import infoSlice from "../info/infoSlice";
import datesSlice from "../dates/datesSlice";
import locationsSlice from "../locations/locationsSlice";
import priceSlice from "../price/priceSlice";
import rentedSlice from "../rented/rentedSlice";


const makeStore = () =>
  configureStore({
    reducer: {
      cars: carsSlice,
      info: infoSlice,
      dates: datesSlice,
      locations: locationsSlice,
      price: priceSlice,
      rented: rentedSlice,
    },
    devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);