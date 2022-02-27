import { item } from './itemTypes';

type ClearItemsAction = { type: 'CLEAR_ITEMS' };
type AddItemAction = { type: 'ADD_ITEM'; payload: item };
type IncreaseItemQuantityAction = { type: 'INCREASE_ITEM_QUANTITY'; payload: number };
type DecreaseItemQuantityAction = { type: 'DECREASE_ITEM_QUANTITY'; payload: number };
export type Actions = ClearItemsAction | AddItemAction | IncreaseItemQuantityAction | DecreaseItemQuantityAction;

export const clearItems = (): ClearItemsAction => ({
  type: 'CLEAR_ITEMS',
});

export const addItem = (item: item): AddItemAction => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const increaseItemQuantity = (itemId: number): IncreaseItemQuantityAction => ({
  type: 'INCREASE_ITEM_QUANTITY',
  payload: itemId,
});

export const decreaseItemQuantity = (itemId: number): DecreaseItemQuantityAction => ({
  type: 'DECREASE_ITEM_QUANTITY',
  payload: itemId,
});
