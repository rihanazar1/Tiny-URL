import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-background-card rounded-xl shadow-lg border border-border p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
