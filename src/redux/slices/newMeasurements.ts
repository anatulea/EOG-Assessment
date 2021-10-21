// not in use
import { createAction, createReducer } from '@reduxjs/toolkit';

// export type NewMeasurement = {
//   at: number;
//   metric: string;
//   unit: string;
//   value: number;
// };
export const newMeasurementData = createAction<any>('newMeasurementData');

// export type Measurement = {
//   at: number;
//   value: number;
//   unit: string;
// };
// export type RealTimeState = {
//   [metricName: string]: Measurement;
// };
// export type InitialState = {
//   realTimeData: RealTimeState;
// };
const initialState: any = {
  realTimeData: {},
};

export const realTimeDataReducer = createReducer(initialState, builder => {
  builder
    .addCase(newMeasurementData, (state, action) => {
      state.realTimeData = action.payload;
    });
});
