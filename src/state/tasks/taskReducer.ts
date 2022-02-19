import { Actions } from './taskActions';
import { task } from './taskTypes';

const initialState: task[] = [];

export const taskReducer = (state: task[] = initialState, action: Actions) => {
  switch (action.type) {
    case 'CLEAR_TASKS': {
      return [];
    }
    case 'ADD_TASK': {
      return [...state, action.payload];
    }
    case 'CHECK_TASK': {
      const newState = [...state];
      const taskToUpdateIndex = newState.findIndex((task) => task.id === action.payload.id);
      newState[taskToUpdateIndex].done = action.payload.done;
      return [...newState];
    }
    case 'DELETE_TASK': {
      const newState = [...state];
      const taskToUDeleteIndex = newState.findIndex((task) => task.id === action.payload);
      newState.splice(taskToUDeleteIndex, 1);
      return [...newState];
    }
    default:
      return state;
  }
};
