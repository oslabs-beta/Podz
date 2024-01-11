import React, { useState } from 'react';
import { addDays } from 'date-fns';
import ToolSnapDateRange from '../components/ToolSnapDateRange';
import ToolSnapDropdown from '../components/ToolSnapDropdown';
import { ToolSnapContainerProps } from '../../types';

const ToolSnapContainer = ({
  loadCluster,
  postSnap,
}: ToolSnapContainerProps) => {
  const [date, setDate] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <div className='toolSnapContainer'>
      <button className='snapButton addInput' onClick={postSnap}>
        Take Snapshot
      </button>
      <ToolSnapDateRange date={date} setDate={setDate} />
      <ToolSnapDropdown date={date} setCluster={loadCluster} />
    </div>
  );
};

export default ToolSnapContainer;
