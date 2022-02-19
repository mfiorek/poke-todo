import { Actions } from './pokemonActions';
import { PokemonsState } from './pokemonTypes';

const initialState: PokemonsState = {
  ownedPokemons: [],
};

export const pokemonReducer = (state = initialState, action: Actions): PokemonsState => {
  switch (action.type) {
    case 'CLEAR_POKEMONS': {
      return {
        ...state,
        ownedPokemons: [],
      };
    }
    case 'ADD_POKEMON': {
      return {
        ...state,
        ownedPokemons: [...state.ownedPokemons, action.payload],
      };
    }
    default:
      return state;
  }
};
