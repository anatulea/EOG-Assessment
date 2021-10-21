import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { gql, useSubscription } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';

import { useAppDispatch } from '../../redux/store/hooks';
import { getLastMeasurement } from '../../redux/slices/lastMeasurement';
import { LAST_MEASUREMENTS, LatsMeasurementsDataResponse } from '../../graphql/lastKnownMeasurement';

// export const GET_NEW_MEASUREMENTS = gql`
// subscription{
//     newMeasurement{
//       metric
//       at
//       value
//       unit
//     }
//   }`;

interface MetricNameProp{
  selectedMetricName:string
}
export const LastMeasurementCard = ({ selectedMetricName }:MetricNameProp) => {
  const dispatch = useAppDispatch();
  // const subData = useSubscription(GET_NEW_MEASUREMENTS);
  const { data, loading, error } = useQuery<LatsMeasurementsDataResponse>(LAST_MEASUREMENTS, {
    variables: { metricName: selectedMetricName },
    pollInterval: 10000,
  });

  const lastMeasurementTime:number = data?.getLastKnownMeasurement.at!;

  useEffect(() => {
    dispatch(getLastMeasurement(lastMeasurementTime));
  });
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {moment(data?.getLastKnownMeasurement.at).format('MMMM Do YYYY, h:mm a')}
        </Typography>
        <Typography variant="h5" component="div">
          {selectedMetricName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">

          {`${data?.getLastKnownMeasurement.value} ${data?.getLastKnownMeasurement.unit}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
