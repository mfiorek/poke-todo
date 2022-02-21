import React from "react";

type Props = {
  name?: string;
  spriteSrc: string;
};

const PokemonTile: React.FC<Props> = (props) => {
  const { name, spriteSrc } = props;

  return (
    <div className="flex flex-col items-center border shadow-md max-w-max">
      <img src={spriteSrc} className='bg-slate-100'/>
      {name && <p className="capitalize w-full p-1 text-center bg-slate-300">{name}</p>}
    </div>
  );
};

export default PokemonTile;
