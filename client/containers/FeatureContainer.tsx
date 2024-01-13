import React from 'react';
import docker from '../assets/docker.png';
import kubernetes from '../assets/kubernetes.png';
import snapshot from '../assets/snapshot.png';

const FeatureContainer = () => {
  return (
    <div id='featureContainer'>
      <h1 className='mainTitle'>Features</h1>
      <div className='featureContent'>
        <div className='feature'>
          <img
            className='featureicon'
            src={docker}
            alt='docker whale picture'
          />
          <h2>Containers</h2>
          <p>Monitors the metrics of each Containers.</p>
        </div>
        <div className='feature'>
          <img className='featureicon' src={kubernetes} alt='cluster picture' />
          <h2>Clusters</h2>
          <p>
            Visualizes the nodes, pods, containers and services of a cluster.
          </p>
        </div>
        <div className='feature'>
          <img className='featureicon' src={snapshot} alt='camera picture' />
          <h2>Snapshots</h2>
          <p>Stores any moment of the cluster and view them later!</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
