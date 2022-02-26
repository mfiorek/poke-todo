import { combineReducers, createStore } from 'redux';
import { taskReducer } from './tasks/taskReducer';
import { pokemonReducer } from './pokemon/pokemonReducer';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({user: userReducer, tasks: taskReducer, pokemons: pokemonReducer})

export const store = createStore(rootReducer);
