import { pokemon } from './pokemonTypes';

type ClearCurrentPokemonAction = { type: 'CLEAR_CURRENT_POKEMON' };
type ClearPokemonsAction = { type: 'CLEAR_POKEMONS' };
type SetCurrentPokemonAction = { type: 'SET_CURRENT_POKEMON'; payload: number };
type AddPokemonAction = { type: 'ADD_POKEMON'; payload: pokemon };
export type Actions = ClearCurrentPokemonAction | ClearPokemonsAction | SetCurrentPokemonAction | AddPokemonAction;

export const clearCurrentPokemon = (): ClearPokemonsAction => ({
  type: 'CLEAR_POKEMONS',
});

export const clearPokemons = (): ClearPokemonsAction => ({
  type: 'CLEAR_POKEMONS',
});

export const setCurrentPokemon = (pokemonId: number): SetCurrentPokemonAction => ({
  type: 'SET_CURRENT_POKEMON',
  payload: pokemonId,
});

export const addPokemon = (pokemon: pokemon): AddPokemonAction => ({
  type: 'ADD_POKEMON',
  payload: pokemon,
});
