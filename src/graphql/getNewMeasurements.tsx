import { gql } from '@apollo/client';

export const GET_NEW_MEASUREMENTS = gql`
subscription{
    newMeasurement{
      metric
      at
      value
      unit
    }
  }`;
