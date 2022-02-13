import { Actions } from './taskActions';
import { task } from './types';

const initialState: task[] = [];

export const taskReducer = (state: task[] = initialState, action: Actions) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return [...state, action.payload];
    }
    case 'CHECK_TASK': {
      const taskToUpdateIndex = state.findIndex((task) => task.id === action.payload.id);
      state[taskToUpdateIndex].done = action.payload.done;
      return [...state];
    }
    case 'DELETE_TASK': {
        const taskToUDeleteIndex = state.findIndex((task) => task.id === action.payload);
        state.splice(taskToUDeleteIndex, 1);
      return [...state];
    }
    default:
      return state;
  }
};
