export interface PokemonsReducerState {
  pokemons: {
    ownedPokemons: pokemon[];
  };
}

export interface PokemonsState {
  ownedPokemons: pokemon[];
}

export interface pokemon {
  id: number;
  name: string;
  spriteSrc: string;
}
