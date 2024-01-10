import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ToolSnapDateRangeProps } from '../../types';

const ToolSnapDateRange = ({ date, setDate }: ToolSnapDateRangeProps) => {
  return (
    <DateRangePicker
      onChange={(item: any) => setDate([item.selection])}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={date}
      direction='horizontal'
      preventSnapRefocus={true}
      calendarFocus='backwards'
      maxDate={new Date()}
    />
  );
};

export default ToolSnapDateRange;
