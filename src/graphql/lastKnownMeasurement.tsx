import { gql } from '@apollo/client';

export const LAST_MEASUREMENTS = gql`
  query ($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric
      at
      value
      unit
    }
  }
`;
interface LastMeasurementsData {
  metric: string,
  at: number,
  value: number,
  unit: string,
}
export interface LatsMeasurementsDataResponse {
  getLastKnownMeasurement: LastMeasurementsData,
}
