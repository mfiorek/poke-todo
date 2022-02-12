import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className='flex gap-2 justify-center items-center w-full h-full'>
      <img src="../../../static/images/pokemon-trainer.gif" alt="" width={30} />
      <p className='text-3xl vt323'>Loading...</p>
    </div>
  );
};

export default Loader;
