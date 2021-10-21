import { configureStore } from '@reduxjs/toolkit';
import { lastMeasurement } from '../slices/lastMeasurement';
import { allMeasurementsReducer } from '../slices/allMeasurements';
// import { realTimeDataReducer } from '../slices/newMeasurements';
import { metricNames } from '../slices/metricNames';

export const store = configureStore({
  reducer: {
    lastMeasurement,
    allMeasurements: allMeasurementsReducer,
    metricNames,
    // metricData: realTimeDataReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
