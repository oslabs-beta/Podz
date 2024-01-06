import React from 'react';
import { useNavigate } from 'react-router-dom';
const OceanContainer = () => {
    const navigate = useNavigate();
    const seeAtlanticOcean = () => {
        navigate('/atlantic');
    };
    const seePacificOcean = () => {
        navigate('/pacific');
    };
    return (React.createElement("div", { id: 'oceanContainer' },
        React.createElement("h1", null, "Ocean"),
        React.createElement("button", { onClick: seeAtlanticOcean }, "Atlantic Ocean"),
        React.createElement("button", { onClick: seePacificOcean }, "Pacific Ocean")));
};
export default OceanContainer;
