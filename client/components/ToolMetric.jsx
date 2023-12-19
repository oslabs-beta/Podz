import React from 'react';

const ToolMetric = ({ nodeData }) => {
  console.log(nodeData);

  let data = (
    <div className='toolMetric'>
      <p>
        <strong>Name:</strong>
      </p>
      <p>
        <strong>Kind:</strong>
      </p>
      <p>
        <strong>UID:</strong>
      </p>
    </div>
  );

  // Node, Pod, Container
  if (nodeData.kind === 'Node') {
    data = (
      <div className='toolMetric'>
        <p>
          <strong>Name:</strong> {nodeData.name}
        </p>
        <p>
          <strong>Kind:</strong> {nodeData.kind}
        </p>
        <p>
          <strong>UID:</strong> {nodeData.uid}
        </p>
        <p>
          <strong>Conditions:</strong>
          <ul>
            <li>
              <strong>Disk Pressure:</strong>{' '}
              {nodeData.conditions.DiskPressure.status},{' '}
              {nodeData.conditions.DiskPressure.message}
            </li>
            <li>
              <strong>Memory Pressure:</strong>{' '}
              {nodeData.conditions.MemoryPressure.status},{' '}
              {nodeData.conditions.MemoryPressure.message}
            </li>
            <li>
              <strong>PID Pressure:</strong>{' '}
              {nodeData.conditions.PIDPressure.status},{' '}
              {nodeData.conditions.PIDPressure.message}
            </li>
            <li>
              <strong>Ready:</strong> {nodeData.conditions.Ready.status},{' '}
              {nodeData.conditions.Ready.message}
            </li>
          </ul>
        </p>
        <p>
          <strong>Created:</strong> {nodeData.creationTimestamp}
        </p>
      </div>
    );
  } else if (nodeData.kind === 'Pod') {
    data = (
      <div className='toolMetric'>
        <p>
          <strong>Name:</strong> {nodeData.name}
        </p>
        <p>
          <strong>Kind:</strong> {nodeData.kind}
        </p>
        <p>
          <strong>UID:</strong> {nodeData.uid}
        </p>
        <p>
          <strong>Status:</strong> {nodeData.status}
        </p>
        <p>
          <strong>Conditions:</strong>
          <ul>
            <li>
              <strong>Container Ready:</strong>{' '}
              {nodeData.conditions.ContainersReady}
            </li>
            <li>
              <strong>Initialized:</strong> {nodeData.conditions.Initialized}
            </li>
            <li>
              <strong>Pod Scheduled:</strong> {nodeData.conditions.PodScheduled}
            </li>
            <li>
              <strong>Ready:</strong> {nodeData.conditions.Ready}
            </li>
          </ul>
        </p>
        <p>
          <strong>Created:</strong> {nodeData.creationTimestamp}
        </p>
      </div>
    );
  } else if (nodeData.kind === 'Container') {
  } else {
  }

  return data;
};

export default ToolMetric;
