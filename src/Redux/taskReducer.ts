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
    default:
      return state;
  }
};
