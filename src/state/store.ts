import { combineReducers, createStore } from 'redux';
import { taskReducer } from './tasks/taskReducer';
import { pokemonReducer } from './pokemon/pokemonReducer';

const rootReducer = combineReducers({tasks: taskReducer, pokemons: pokemonReducer})

export const store = createStore(rootReducer);
