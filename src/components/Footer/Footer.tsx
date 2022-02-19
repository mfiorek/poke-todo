import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className={`w-full flex justify-center bg-slate-300 text-white`}>
      <p className='m-2 text-slate-700'>
        Made for 🤪 by{' '}
        <a href='https://mfiorek.github.io/' className='text-slate-900'>
          Marcin Fiorek Codes
        </a>
        {' '}💻
      </p>
    </div>
  );
};

export default Footer;
