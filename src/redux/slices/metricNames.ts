import { createAction, createReducer } from '@reduxjs/toolkit';

export const getMetricNames = createAction<any>('getMetricNames');
export const getSelectedMetric = createAction<any>('getSelectedMetric');

const initialState = {
  metricNames: [],
  selectedMetrics: [],
};
export const metricNames = createReducer(initialState, builder => {
  builder
    .addCase(getMetricNames, (state, action) => {
      state.metricNames = action.payload;
    })
    .addCase(getSelectedMetric, (state, action) => {
      state.selectedMetrics = action.payload;
    });
});
