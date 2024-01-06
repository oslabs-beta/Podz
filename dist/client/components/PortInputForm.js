import React from 'react';
const PortInputForm = () => {
    return (React.createElement("div", { className: 'Input' },
        React.createElement("label", { for: 'portInputForm' }, "Port:"),
        React.createElement("input", { type: 'text', id: 'portInputForm', required: true, minlength: '4', maxlength: '5' })));
};
export default PortInputForm;
