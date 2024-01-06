import React from 'react';
import logo from '../assets/logo.png';
const IntroContainer = () => {
    return (React.createElement("div", { className: 'introContainer' },
        React.createElement("div", { className: 'introText' },
            React.createElement("h1", null,
                React.createElement("b", null, "Podz")),
            React.createElement("p", null, " Kubernetes Cluster Visualizing System")),
        React.createElement("img", { className: 'introLogo', src: logo })));
};
export default IntroContainer;
