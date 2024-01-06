import React from 'react';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const navigate = useNavigate();
    function returnHome() {
        navigate('/');
        scrollTo(0, 0);
    }
    return (React.createElement("div", { className: 'navBar' },
        React.createElement("div", { className: 'navName', onClick: returnHome }, "Podz"),
        React.createElement("div", { className: 'navTab' },
            React.createElement("a", { href: '#featureContainer' }, "Features"),
            React.createElement("a", { href: '#demoContainer' }, "Demo"),
            React.createElement("a", { href: '#teamContainer' }, "Team"))));
};
export default NavBar;
