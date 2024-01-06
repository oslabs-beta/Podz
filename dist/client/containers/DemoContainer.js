import React from 'react';
import { useNavigate } from 'react-router-dom';
const DemoContainer = () => {
    const navigate = useNavigate();
    function tryTool() {
        navigate('/tool');
        scrollTo(0, 0);
    }
    return (React.createElement("div", { id: 'demoContainer' },
        React.createElement("h1", null, "Try Dev Tool"),
        React.createElement("button", { className: 'demoButton', onClick: tryTool }, "Try Tool Now!")));
};
export default DemoContainer;
