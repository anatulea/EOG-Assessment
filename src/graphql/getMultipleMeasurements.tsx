import { gql } from '@apollo/client';

export const MEASUREMENTS = gql`
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
  `;

interface Measurement {
  metric: string;
  at: number;
  value: number;
  unit: string;
}

interface MultipleMeasurementsData {
  metric:string;
  measurements: Measurement[]
}

export interface MultipleMeasurementsDataResponse {
  getMultipleMeasurements: MultipleMeasurementsData
}
