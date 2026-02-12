
import React from 'react';

export const Card: React.FC<{ 
  children: React.ReactNode; 
  title?: string;
  className?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}> = ({ children, title, className = "", headerAction, noPadding = false }) => (
  <div className={`bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-slate-200 ${className}`}>
    {(title || headerAction) && (
      <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white">
        {title && <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>}
        {headerAction}
      </div>
    )}
    <div className={noPadding ? '' : 'p-8'}>
      {children}
    </div>
  </div>
);

export const ProgressBar: React.FC<{ 
  value: number; 
  max: number; 
  label?: string; 
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ value, max, label, className = "", color = "bg-blue-600", size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
  const percentage = Math.round((value / (max || 1)) * 100);
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-end mb-2.5">
          <span className="text-sm text-slate-600 font-bold tracking-tight">{label}</span>
          <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">{percentage}%</span>
        </div>
      )}
      <div className={`${heightClass} w-full bg-slate-100 rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out relative rounded-full shadow-[0_0_12px_rgba(37,99,235,0.2)]`} 
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
