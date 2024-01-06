import React from 'react';
import { useNavigate } from 'react-router-dom';
const WhaleContainer = () => {
    const navigate = useNavigate();
    const seeBlueWhale = () => {
        navigate('/bluewhale');
    };
    const seeHumpback = () => {
        navigate('/humpback');
    };
    const seeSpermWhale = () => {
        navigate('/spermwhale');
    };
    return (React.createElement("div", { id: 'whaleContainer' },
        React.createElement("h1", null, "Whale"),
        React.createElement("button", { onClick: seeBlueWhale }, "Blue Whale"),
        React.createElement("button", { onClick: seeHumpback }, "Humpback Whale"),
        React.createElement("button", { onClick: seeSpermWhale }, "Sperm Whale")));
};
export default WhaleContainer;
