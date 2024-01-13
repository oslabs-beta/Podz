import React, { useState } from 'react';
import { ToolSnapDropdownProps } from '../../../types';

const ToolSnapDropdown = ({ date, setCluster }: ToolSnapDropdownProps) => {
  const [display, setDisplay] = useState(false);
  const [listItems, setListItems] = useState([]);

  const listMaker = (snapshotList: any) => {
    const list = [];
    for (let i = 0; i < snapshotList.length; i++) {
      const { snapshotTime } = snapshotList[i];
      const date = new Date(snapshotTime);
      const formattedDate = date.toLocaleString();
      list.push(
        <li className='dropdownItem' onClick={itemClick} id={snapshotTime}>
          {formattedDate}
        </li>
      );
    }
    setListItems(list);
  };

  const dropdownButtonClick = async () => {
    if (!display) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }

    const response = await fetch(
      `/api/tool/snapshot/list?start=${date[0].startDate.getTime()}&end=${
        date[0].endDate.getTime() + 86400000
      }`
    );
    const data = await response.json();
    listMaker(data);
  };

  const itemClick = async (event: any) => {
    const snapshotTime = event.target.getAttribute('id');
    const response = await fetch(
      `/api/tool/snapshot?snapshotTime=${snapshotTime}`
    );
    const data = await response.json();
    setCluster(data);
  };

  return (
    <div className='toolSnapDropdown'>
      <button className='snapButton' onClick={dropdownButtonClick}>
        Load Snapshot
      </button>
      {display && <ul className='dropdown'>{listItems}</ul>}
    </div>
  );
};

export default ToolSnapDropdown;
