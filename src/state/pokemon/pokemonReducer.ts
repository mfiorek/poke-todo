import { Actions } from './pokemonActions';
import { PokemonsState } from './pokemonTypes';

const initialState: PokemonsState = {
  ownedPokemons: [],
  currentPokemonId: undefined,
};

export const pokemonReducer = (state = initialState, action: Actions): PokemonsState => {
  switch (action.type) {
    case 'CLEAR_CURRENT_POKEMON': {
      return {
        ...state,
        currentPokemonId: undefined,
      };
    }
    case 'CLEAR_POKEMONS': {
      return {
        ...state,
        ownedPokemons: [],
      };
    }
    case 'SET_CURRENT_POKEMON': {
      return {
        ...state,
        currentPokemonId: action.payload,
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
