export interface PokemonsReducerState {
  pokemons: PokemonsState;
}

export interface PokemonsState {
  ownedPokemons: pokemon[];
  currentPokemonId: number | undefined;
}

export interface pokemon {
  id: number;
  name: string;
  level: number;
  spriteSrc: string;
  hp: number;
  maxHp: number;
  exp: number;
  maxExp: number;
}
