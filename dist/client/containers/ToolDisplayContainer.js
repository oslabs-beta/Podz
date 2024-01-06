import React, { useState } from 'react';
import ToolTree from '../components/ToolTree.jsx';
import ToolMetric from '../components/ToolMetric.jsx';
import PortInputForm from '../components/PortInputForm.jsx';
const ToolDisplayContainer = () => {
    const [cluster, setCluster] = useState({ data: [] });
    const [metric, setMetric] = useState({});
    const [loading, setLoading] = useState(false);
    function fetchData() {
        setLoading(true);
        fetch('/tool/data')
            .then((response) => response.json())
            .then((data) => {
            setCluster(data);
            setLoading(false);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    return (React.createElement("div", { className: 'toolDisplayContainer' },
        React.createElement(ToolTree, { setToolMetric: setMetric, clusterData: cluster }),
        React.createElement("div", { className: 'toolInfo' },
            React.createElement("button", { className: 'toolBuild', onClick: fetchData }, loading ? 'Loading ...' : 'Load Cluster'),
            React.createElement(ToolMetric, { nodeData: metric }))));
};
export default ToolDisplayContainer;
