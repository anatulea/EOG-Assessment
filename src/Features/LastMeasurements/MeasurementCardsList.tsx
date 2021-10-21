import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useAppSelector } from '../../redux/store/hooks';
import type { RootState } from '../../redux/store/store';
import { LastMeasurementCard } from './LastMeasurementCard';

export const MeasurementCardsList = () => {
  const selectedMetrics: string[] = useAppSelector(
    (state: RootState) => state.metricNames.selectedMetrics,
  );
  return (
    <Box sx={{ flexGrow: 1, marginLeft: 10 }}>
      {selectedMetrics.length ? (<h1>Latest Measurements</h1>) : null}
      <Grid container spacing={{ xs: 4, md: 4 }}>
        {selectedMetrics.map(metric => (
          <Grid item xs='auto' key={metric}>
            <LastMeasurementCard selectedMetricName={metric} />
          </Grid>
        )) }
      </Grid>
    </Box>
  );
};
