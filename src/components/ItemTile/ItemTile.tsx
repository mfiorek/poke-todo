import React from 'react';

type Props = {
  name: string;
  price?: number;
  spriteSrc: string;
  quantity?: number;
  onClick?: () => void;
};

const ItemTile: React.FC<Props> = (props) => {
  const { name, price, spriteSrc, quantity, onClick } = props;

  return (
    <div className='relative flex flex-col items-center border shadow-md bg-slate-100' onClick={onClick}>
      <div id='image-container' className='flex justify-center items-center' style={{ minHeight: '60px', minWidth: '60px' }}>
        <img src={spriteSrc} style={{ minHeight: '30px', minWidth: '30px' }} />
      </div>
      {name && <p className='capitalize w-full p-1 text-center bg-slate-300'>{name}</p>}
      {price !== undefined && <p className='w-full p-1 text-center bg-slate-300'>{price} 🪙</p>}
      {quantity !== undefined && (
        <div
          style={{ minWidth: '30px' }}
          className='absolute -top-0 -right-0 translate translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-full p-1 bg-slate-300 shadow-md'
        >
          <p>{quantity}</p>
        </div>
      )}
    </div>
  );
};

export default ItemTile;
