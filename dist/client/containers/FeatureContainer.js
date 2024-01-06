import React from 'react';
import docker from '../assets/docker.png';
import kubernetes from '../assets/kubernetes.png';
import notification from '../assets/notification.png';
const FeatureContainer = () => {
    return (React.createElement("div", { id: 'featureContainer' },
        React.createElement("h1", null, "Features"),
        React.createElement("div", { className: 'featureContent' },
            React.createElement("div", { id: 'feature1' },
                React.createElement("img", { className: 'icon', src: docker, alt: 'docker whale picture' }),
                React.createElement("h1", { className: 'featureTextTitle' }, "Containers"),
                React.createElement("h2", { className: 'featureText' }, "Monitors the metrics of each Containers.")),
            React.createElement("div", { id: 'feature2' },
                React.createElement("img", { className: 'icon', src: kubernetes, alt: 'cluster picture' }),
                React.createElement("h1", { className: 'featureTextTitle' }, "Clusters"),
                React.createElement("h2", { className: 'featureText' }, "Visualizes the nodes, pods, containers and services of a cluster.")),
            React.createElement("div", { id: 'feature3' },
                React.createElement("img", { className: 'icon', src: notification, alt: 'bell picture' }),
                React.createElement("h1", { className: 'featureTextTitle' }, "Notifications"),
                React.createElement("h2", { className: 'featureText' }, "Receive notifications of any cluster error.")))));
};
export default FeatureContainer;
