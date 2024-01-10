import React from 'react';
import docker from '../assets/docker.png';
import kubernetes from '../assets/kubernetes.png';
import snapshot from '../assets/snapshot.png';

const FeatureContainer = () => {
  return (
    <div id='featureContainer'>
      <h1>Features</h1>
      <div className='featureContent'>
        <div id='feature1'>
          <img className='icon' src={docker} alt='docker whale picture' />
          <h1 className='featureTextTitle'>Containers</h1>
          <h2 className='featureText'>
            Monitors the metrics of each Containers.
          </h2>
        </div>
        <div id='feature2'>
          <img className='icon' src={kubernetes} alt='cluster picture' />
          <h1 className='featureTextTitle'>Clusters</h1>
          <h2 className='featureText'>
            Visualizes the nodes, pods, containers and services of a cluster.
          </h2>
        </div>
        <div id='feature3'>
          <img className='icon' src={snapshot} alt='bell picture' />
          <h1 className='featureTextTitle'>Snapshots</h1>
          <h2 className='featureText'>
            Stores any moment of the cluster and view them later!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
