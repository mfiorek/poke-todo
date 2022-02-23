import React from 'react';
import { useSelector } from 'react-redux';
import { PokemonsReducerState } from '../../state/pokemon/pokemonTypes';

type Props = {
  id: number;
  name?: string;
  spriteSrc: string;
  onClick?: () => void;
};

const PokemonTile: React.FC<Props> = (props) => {
  const { id, name, spriteSrc, onClick } = props;
  const currentPokemonId = useSelector<PokemonsReducerState, number | undefined>((state) => state.pokemons.currentPokemonId);

  return (
    <div className='flex flex-col items-center border shadow-md max-w-max' onClick={onClick}>
      <img src={spriteSrc} height='96px' width='96px' className={currentPokemonId === id ? 'bg-amber-100' : 'bg-slate-100'} />
      {name && <p className='capitalize w-full p-1 text-center bg-slate-300'>{name}</p>}
    </div>
  );
};

export default PokemonTile;
