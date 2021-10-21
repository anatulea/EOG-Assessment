import React from 'react';
import { useAppSelector } from '../../redux/store/hooks';
import type { RootState } from '../../redux/store/store';
import Chart from './Chart';

export function MultipleCharts(): JSX.Element {
  const selectedMeasurements: string[] = useAppSelector(
    (state: RootState) => state.metricNames.selectedMetrics,
  );

  return (
    <>
      {selectedMeasurements.map(metric => <Chart metricValueName={metric} key={metric} />)}
    </>
  );
}
