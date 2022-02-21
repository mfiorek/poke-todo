import React from "react";
import PokemonTile from "../PokemonTile/PokemonTile";
import StatBar from "../StatBar/StatBar";

type Props = {
};

const CurrentPokemonBanner: React.FC<Props> = (props) => {

  return (
    <div className='flex items-center gap-4 p-2 bg-emerald-400'>
        <PokemonTile spriteSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png" />
        <div>
            <div className="flex gap-2">
                <span className="vt323 text-xl">WEEZING</span>
                <span className="vt323 text-xl">LVL: {3}</span>
            </div>
            <StatBar label="hp:" currentValue={43} max={80} color="#f74e52" />
            <StatBar label="exp:" currentValue={23} max={60} color="#ffcd00" />
        </div>
    </div>
  );
};

export default CurrentPokemonBanner;
