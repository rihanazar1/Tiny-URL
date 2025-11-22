import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader2 className={`${sizes[size]} text-primary animate-spin`} />
      {text && <p className="text-text-light text-sm">{text}</p>}
    </div>
  );
};

export default Loader;
