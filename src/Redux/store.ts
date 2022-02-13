import { combineReducers, createStore } from 'redux';
import { taskReducer } from './taskReducer';

const rootReducer = combineReducers({tasksState: taskReducer})

export const store = createStore(rootReducer);
