/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { useQuery } from '@apollo/client';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import {
  LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, ResponsiveContainer, Tooltip,
} from 'recharts';

import { useAppSelector } from '../../redux/store/hooks';
import type { RootState } from '../../redux/store/store';
import { MEASUREMENTS, MultipleMeasurementsDataResponse } from '../../graphql/getMultipleMeasurements';

const CustomTooltip = ({ active, payload }:{ active:any, payload:any }) => {
  if (active && payload && payload.length) {
    const dateAndTime = moment(payload[0].payload.at).format('MMMM Do YYYY, h:mm a');
    return (
      <div className="custom-tooltip">
        <h3>{`${payload[0].payload.metric}`}</h3>
        <p>{`${dateAndTime}`}</p>
        <h4>{`${payload[0].value} ${payload[0].payload.unit}`} </h4>
      </div>
    );
  }
  return null;
};

interface MetricProps {
  metricValueName: string;
}

export default function Chart({ metricValueName }: MetricProps) {
  const lastDateToBeKnown = useAppSelector((state : RootState) => state);

  const endDate = lastDateToBeKnown?.lastMeasurement.lastMeasurement!;

  const minutesAgo = 30;
  const latestDate = new Date(endDate);
  const thirtyMinAgo: any = new Date(latestDate.getTime() - minutesAgo * 60000);
  const startDate = Date.parse(thirtyMinAgo);

  const input = {
    metricName: metricValueName,
    after: startDate,
    before: endDate,
  };

  const { loading, error, data } = useQuery<MultipleMeasurementsDataResponse>(MEASUREMENTS, {
    variables: {
      input,
    },
    pollInterval: 10000,
  });

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const dataM: any = data?.getMultipleMeasurements!;
  const dataToBeDisplayed = dataM[0].measurements;

  const cleanedDataArrOfObjects: {
    timeStamp:string,
    temp: number,
    metric:string,
    unit:string,
    at:number } [] = [];

  function extractDate(time :number) {
    return moment(time).format('h:mm');
  }

  for (const keyName in dataToBeDisplayed) {
    let timestamp :string = '';

    timestamp = extractDate(dataToBeDisplayed[keyName].at);
    cleanedDataArrOfObjects.push({
      at: dataToBeDisplayed[keyName].at,
      timeStamp: timestamp,
      temp: dataToBeDisplayed[keyName].value,
      metric: dataToBeDisplayed[keyName].metric,
      unit: dataToBeDisplayed[keyName].unit,
    });
  }

  return (
    <ResponsiveContainer width="80%" height="80%">
      <LineChart
        width={800}
        height={800}
        data={cleanedDataArrOfObjects}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timeStamp" minTickGap={100} />
        <YAxis unit={` ${cleanedDataArrOfObjects[0].unit}`} type="number" domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip active payload />} />
        <Legend />
        <Line name={input.metricName} type="linear" dataKey="temp" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />;
      </LineChart>
    </ResponsiveContainer>
  );
}
