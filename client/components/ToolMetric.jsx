import React from 'react';

const ToolMetric = ({ nodeData }) => {
  let data = (
    <div className='toolMetric'>
      <p>
        <strong>Click on a node!</strong>
      </p>
    </div>
  );

  // Master Node, Node, Pod, Container, Services
  if (nodeData.kind === 'MasterNode') {
    data = (
      <div className='toolMetric'>
        <p>
          <strong>Kind:</strong> {nodeData.kind}
        </p>
      </div>
    );
  } else if (nodeData.kind === 'Node') {
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
    let status;
    if (nodeData.started) status = 'Running';
    else status = 'Stopped';

    const labels = [];
    for (const ele in nodeData.labels) {
      labels.push(ele.key);
    }

    data = (
      <div className='toolMetric'>
        <p>
          <strong>Name:</strong> {nodeData.name}
        </p>
        <p>
          <strong>Kind:</strong> {nodeData.kind}
        </p>
        <p>
          <strong>ID:</strong> {nodeData._id}
        </p>
        <p>
          <strong>Image:</strong> {nodeData.image}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Restart Count:</strong> {nodeData.restartCount}
        </p>
        <p>
          <strong>Labels:</strong> {labels}
        </p>
        <p>
          <strong>Started Since:</strong> {nodeData.startedAt}
        </p>
      </div>
    );
  } else if (nodeData.kind === 'Service') {
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
          <strong>Cluster IP:</strong> {nodeData.clusterIPs}
        </p>
        <p>
          <strong>Selector:</strong> app: {nodeData.selector.app}
        </p>
        <p>
          <strong>Type:</strong> {nodeData.type}
        </p>
        <p>
          <strong>Created:</strong> {nodeData.creationTimestamp}
        </p>
      </div>
    );
  }

  return data;
};

export default ToolMetric;
