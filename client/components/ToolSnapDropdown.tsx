import React, { useState } from 'react';
import { ToolSnapDropdownProps } from '../../types';

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
      `/tool/snapshot/list?start=${date[0].startDate.getTime()}&end=${date[0].endDate.getTime()}`
    );
    const data = await response.json();
    listMaker(data);
  };

  const itemClick = async (event: any) => {
    const snapshotTime = event.target.getAttribute('id');
    const response = await fetch(`/tool/snapshot?snapshotTime=${snapshotTime}`);
    const data = await response.json();
    setCluster(data);
    setDisplay(false);
  };

  const currentItemClick = async () => {
    const response = await fetch('/tool/data');
    const data = await response.json();
    setCluster(data);
    setDisplay(false);
  };

  return (
    <div className='toolSnapDropdown'>
      <button className='toolSnapButton' onClick={dropdownButtonClick}>
        Load Snapshot
      </button>
      {display && (
        <ul className='dropdown'>
          <li className='dropdownItem' onClick={currentItemClick}>
            Current
          </li>
          {listItems}
        </ul>
      )}
    </div>
  );
};

export default ToolSnapDropdown;
