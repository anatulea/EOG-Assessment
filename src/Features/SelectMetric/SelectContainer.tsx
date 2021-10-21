import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SelectMetricInput } from './SelectMetricInput';

export const SelectContainer = () => (
  <>
    <CssBaseline />
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, margin: 5 }}>
        <SelectMetricInput />
      </Box>
    </Container>
  </>
);
