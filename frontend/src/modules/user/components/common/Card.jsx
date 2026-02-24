import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
    return (
        <div className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm transition-all ${hover ? 'hover:shadow-md hover:-translate-y-1' : ''
            } ${className}`}>
            {children}
        </div>
    );
};

export default Card;
