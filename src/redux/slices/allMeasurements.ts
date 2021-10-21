/* eslint-disable max-len */
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  allMeasurements: {},
};
export const getAllMeasurements = createAction<any>('getAllMeasurements');

export const allMeasurementsReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAllMeasurements, (state, action) => {
      // some ts error that I don't know how to fix
      // const { at, metric, unit, value } = action.payload;
      // state.allMeasurements[metric] = { at, unit, value }
      state.allMeasurements = action.payload;
    });
});
