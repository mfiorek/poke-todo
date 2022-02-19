import { pokemon } from "../state/pokemon/pokemonTypes";

class PokeAPIHelper {
  static getPokemonById = async (id: number): Promise<pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      id,
      name: data.species.name,
      spriteSrc: data.sprites.front_default,
    };
  };
}

export default PokeAPIHelper;
