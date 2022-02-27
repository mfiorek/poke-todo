import { combineReducers, createStore } from 'redux';
import { taskReducer } from './tasks/taskReducer';
import { pokemonReducer } from './pokemon/pokemonReducer';
import { userReducer } from './user/userReducer';
import { itemReducer } from './items/itemReducer';

const rootReducer = combineReducers({user: userReducer, tasks: taskReducer, pokemons: pokemonReducer, items: itemReducer})

export const store = createStore(rootReducer);
