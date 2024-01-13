import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ToolSnapDateRangeProps } from '../../../types';

const ToolSnapDateRange = ({ date, setDate }: ToolSnapDateRangeProps) => {
  return (
    <div className='toolSnapDateRange'>
      <DateRange
        editableDateInputs={true}
        onChange={(item: any) => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        maxDate={new Date()}
      />
    </div>
  );
};

export default ToolSnapDateRange;
