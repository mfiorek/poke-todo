type ClearUserAction = { type: "CLEAR_USER" };
type SetUserNameAction = { type: "SET_USER_NAME"; payload: string };
type SetGoldAction = { type: "SET_GOLD"; payload: number };
type AddGoldAction = { type: "ADD_GOLD"; payload: number };
type SubtractGoldAction = { type: "SUBTRACT_GOLD"; payload: number };
export type Actions = ClearUserAction | SetUserNameAction | SetGoldAction | AddGoldAction | SubtractGoldAction;

export const clearUser = (): ClearUserAction => ({
  type: "CLEAR_USER",
});

export const setUserName = (name: string): SetUserNameAction => ({
  type: "SET_USER_NAME",
  payload: name,
});

export const setGold = (gold: number): SetGoldAction => ({
  type: "SET_GOLD",
  payload: gold,
});

export const addGold = (gold: number): AddGoldAction => ({
  type: "ADD_GOLD",
  payload: gold,
});

export const subtractGold = (gold: number): SubtractGoldAction => ({
  type: "SUBTRACT_GOLD",
  payload: gold,
});
