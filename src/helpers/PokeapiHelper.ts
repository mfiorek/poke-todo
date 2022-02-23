import { pokemon } from '../state/pokemon/pokemonTypes';

class PokeAPIHelper {
  static getPokemonById = async (id: number): Promise<pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      id,
      name: data.species.name,
      level: 1,
      spriteSrc: data.sprites.front_default,
      hp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
      maxHp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
      exp: 0,
      maxExp: data.base_experience,
    };
  };
}

export default PokeAPIHelper;
