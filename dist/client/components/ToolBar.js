import React from 'react';
import { useNavigate } from 'react-router-dom';
const ToolBar = () => {
    const navigate = useNavigate();
    function returnHome() {
        navigate('/');
        scrollTo(0, 0);
    }
    return (React.createElement("div", { className: 'toolBar' },
        React.createElement("div", { className: 'toolName', onClick: returnHome }, "Podz"),
        React.createElement("div", null)));
};
export default ToolBar;
