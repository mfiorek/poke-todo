import React from 'react';
import { useSelector } from 'react-redux';
import { UserReducerState } from '../../state/user/userTypes';

const PlayerBanner: React.FC = () => {
  const payerName = useSelector<UserReducerState, string>((state) => state.user.name);
  const payerGold = useSelector<UserReducerState, number>((state) => state.user.gold);

  return (
    <div className='flex items-center p-2 gap-2'>
      <div className='flex flex-col items-end justify-center gap-2'>
        <span className='vt323 text-xl capitalize'>{payerName}</span>
        <span className='vt323'>Gold: {payerGold} 🪙</span>
      </div>
      <div className='border shadow-md bg-slate-200'>
        <img src='./static/images/avatar.png' style={{ maxHeight: '96px', maxWidth: '96px' }} />
      </div>
    </div>
  );
};

export default PlayerBanner;
