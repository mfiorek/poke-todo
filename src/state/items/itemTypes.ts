export interface ItemsReducerState {
  items: item[];
}

export interface item {
  id: number;
  name: string;
  price: number;
  spriteSrc: string;
  quantity: number;
}
