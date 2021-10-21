import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { useAppDispatch } from '../../redux/store/hooks';
import { getMetricNames, getSelectedMetric } from '../../redux/slices/metricNames';
import { METRICS_DATA } from '../../graphql/metricsNames';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name:any, metricSelected: any, theme:any) {
  return {
    fontWeight:
        metricSelected.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
  };
}
export const SelectMetricInput = () => {
  const theme = useTheme();

  const [metricSelected, setSelectedMetric] = React.useState([]);

  const { loading, error, data } = useQuery(METRICS_DATA);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMetricNames(data?.getMetrics!));
    dispatch(getSelectedMetric(metricSelected));
  }, [metricSelected]);

  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event;
    setSelectedMetric(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{`Error! ${error.message}`}</Typography>;
  const { getMetrics } = data!;

  return (
    <FormControl sx={{ m: 1, width: 800 }}>
      <InputLabel id="demo-multiple-chip-label">Select Metric</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={metricSelected}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Select Metric" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {getMetrics.map((name:string) => (
          <MenuItem
            key={`${name}`}
            value={name}
            style={getStyles(name, metricSelected, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
