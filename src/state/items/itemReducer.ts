import { Actions } from './itemActions';
import { item } from './itemTypes';

const initialState: item[] = [];

export const itemReducer = (state: item[] = initialState, action: Actions) => {
  switch (action.type) {
    case 'CLEAR_ITEMS': {
      return initialState;
    }
    case 'ADD_ITEM': {
      return [...state, action.payload];
    }
    case 'INCREASE_ITEM_QUANTITY': {
      const newState = [...state];
      const itemToupdateIndex = newState.findIndex((item) => item.id === action.payload);
      newState[itemToupdateIndex].quantity++;
      return [...newState];
    }
    case 'DECREASE_ITEM_QUANTITY': {
      const newState = [...state];
      const itemToupdateIndex = newState.findIndex((item) => item.id === action.payload);
      newState[itemToupdateIndex].quantity--;
      return [...newState];
    }
    default:
      return state;
  }
};
