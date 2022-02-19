import { pokemon } from './pokemonTypes';

type ClearPokemonsAction = { type: 'CLEAR_POKEMONS' };
type AddPokemonAction = { type: 'ADD_POKEMON'; payload: pokemon };
export type Actions = ClearPokemonsAction | AddPokemonAction;

export const clearPokemon = (): ClearPokemonsAction => ({
  type: 'CLEAR_POKEMONS',
});

export const addPokemon = (pokemon: pokemon): AddPokemonAction => ({
  type: 'ADD_POKEMON',
  payload: pokemon,
});
