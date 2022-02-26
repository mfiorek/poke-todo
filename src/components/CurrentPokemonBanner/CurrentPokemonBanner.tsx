import React from 'react';
import { useSelector } from 'react-redux';
import { pokemon, PokemonsReducerState } from '../../state/pokemon/pokemonTypes';
import PokemonTile from '../PokemonTile/PokemonTile';
import StatBar from '../StatBar/StatBar';

const CurrentPokemonBanner: React.FC = () => {
  const currentPokemonId = useSelector<PokemonsReducerState, number | undefined>((state) => state.pokemons.currentPokemonId);
  const currentPokemon = useSelector<PokemonsReducerState, pokemon | undefined>((state) => state.pokemons.ownedPokemons.find((pokemon) => pokemon.id === currentPokemonId));

  return (
    <div className='flex items-center gap-4 p-2'>
      <PokemonTile id={currentPokemon?.id || 0} spriteSrc={currentPokemon?.spriteSrc || ''} />
      <div>
        <div className='flex gap-2'>
          <span className='vt323 text-xl capitalize'>{currentPokemon?.name}</span>
          <span className='vt323 text-xl'>LVL: {currentPokemon?.level}</span>
        </div>
        <StatBar label='hp:' currentValue={currentPokemon?.hp || 0} max={currentPokemon?.maxHp || 0} color='#f74e52' />
        <StatBar label='exp:' currentValue={currentPokemon?.exp || 0} max={currentPokemon?.maxExp || 0} color='#ffcd00' />
      </div>
    </div>
  );
};

export default CurrentPokemonBanner;
