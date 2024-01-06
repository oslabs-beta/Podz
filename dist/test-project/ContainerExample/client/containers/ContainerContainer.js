import React from 'react';
import { useNavigate } from 'react-router-dom';
const ContainerContainer = () => {
    const navigate = useNavigate();
    const seeShipContainer = () => {
        navigate('/ship');
    };
    const seeDockerContainer = () => {
        navigate('/docker');
    };
    return (React.createElement("div", { id: 'containerContainer' },
        React.createElement("h1", null, "Container"),
        React.createElement("button", { onClick: seeShipContainer }, "Ship Container"),
        React.createElement("button", { onClick: seeDockerContainer }, "Docker Container")));
};
export default ContainerContainer;
