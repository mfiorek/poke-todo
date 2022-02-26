import { Actions } from './userActions';
import { User } from './userTypes';

const initialState: User = {
  name: '',
  gold: 0,
};

export const userReducer = (state = initialState, action: Actions): User => {
  switch (action.type) {
    case 'CLEAR_USER': {
      return initialState;
    }
    case 'SET_USER_NAME': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'SET_GOLD': {
      return {
        ...state,
        gold: action.payload,
      };
    }
    case 'ADD_GOLD': {
      return {
        ...state,
        gold: state.gold + action.payload,
      };
    }
    case 'SUBTRACT_GOLD': {
      return {
        ...state,
        gold: state.gold - action.payload,
      };
    }
    default:
      return state;
  }
};
