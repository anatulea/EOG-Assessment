import { createAction, createReducer } from '@reduxjs/toolkit';

export const getLastMeasurement = createAction<number>('getLastMeasurementTime');

// reducer
const initialState = {
  lastMeasurement: 1634796217539,
};
export const lastMeasurement = createReducer(initialState, builder => {
  builder
    .addCase(getLastMeasurement, (state, action) => {
      state.lastMeasurement = action.payload;
    });
});
