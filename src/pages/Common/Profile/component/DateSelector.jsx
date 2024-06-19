import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from(new Array(50), (val, index) => index + 1975);

const DateSelector = ({ 
  startMonth, 
  setStartMonth, 
  startYear, 
  setStartYear, 
  endMonth, 
  setEndMonth, 
  endYear, 
  setEndYear, 
  handleChange, 
  showMonths = true 
}) => {
  return (
    <Box>
      {showMonths && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Start Month</InputLabel>
            <Select
              value={startMonth}
              onChange={(e) => { setStartMonth(e.target.value); handleChange(); }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel>Start Year</InputLabel>
        <Select
          value={startYear}
          onChange={(e) => { setStartYear(e.target.value); handleChange(); }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {showMonths && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>End Month</InputLabel>
            <Select
              value={endMonth}
              onChange={(e) => { setEndMonth(e.target.value); handleChange(); }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel>End Year</InputLabel>
        <Select
          value={endYear}
          onChange={(e) => { setEndYear(e.target.value); handleChange(); }}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateSelector;
