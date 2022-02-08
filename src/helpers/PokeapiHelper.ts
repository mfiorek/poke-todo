import Pokemon from '../Types/Pokemon';

class PokeAPIHelper {
  static getPokemonById = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      name: data.species.name,
      img: data.sprites.front_default,
    };
  };
}

export default PokeAPIHelper;
