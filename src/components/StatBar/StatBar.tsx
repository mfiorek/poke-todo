import React from 'react';

type Props = {
  label: string;
  max: number;
  currentValue: number;
  color: string;
};

const StatBar: React.FC<Props> = ({ label, max, currentValue, color }) => {
  return (
    <div className='flex gap-2 items-center'>
      <span style={{minWidth: '25px'}} className='uppercase vt323'>{label}</span>
      <div style={{height: '12px', minWidth: '200px'}} className='inline-block border border-emerald-600 overflow-hidden rounded-full bg-emerald-100 bg-blend-hard-light'>
        <div style={{ background: color, width: `${(100 * currentValue) / max}%` }} className='h-full'></div>
      </div>
      <span className='vt323'>
        {currentValue}/{max}
      </span>
    </div>
  );
};

export default StatBar;
