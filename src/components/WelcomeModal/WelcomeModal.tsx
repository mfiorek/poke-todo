import { addDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokeAPIHelper from '../../helpers/PokeapiHelper';
import useDatabaseHelper from '../../helpers/useDatabaseHelper';
import { setCurrentPokemon } from '../../state/pokemon/pokemonActions';
import { pokemon } from '../../state/pokemon/pokemonTypes';
import { UserReducerState } from '../../state/user/userTypes';
import Modal from '../Modal/Modal';
import PokemonTile from '../PokemonTile/PokemonTile';

const WelcomeModal: React.FC = () => {
  const payerName = useSelector<UserReducerState, string>((state) => state.user.name);
  const [selectedPokemon, setSelectedPokemon] = useState<pokemon | undefined>(undefined);
  const [startingPokemons, setStartingPokemons] = useState<pokemon[]>([]);
  const databaseHelper = useDatabaseHelper();
  const dispatch = useDispatch();

  useEffect(() => {
    const bulbasaurPromise = PokeAPIHelper.getPokemonById(1);
    const charmanderPromise = PokeAPIHelper.getPokemonById(4);
    const squirtlePromise = PokeAPIHelper.getPokemonById(7);

    Promise.all([bulbasaurPromise, charmanderPromise, squirtlePromise]).then((resolvedPokemonsArray) => {
      setStartingPokemons(resolvedPokemonsArray);
    });
  }, []);

  const selectPokemon = (pokemon: pokemon) => {
    setSelectedPokemon(pokemon);
    dispatch(setCurrentPokemon(pokemon.id));
  };

  const addSelectedPokemon = () => {
    if (!!selectedPokemon) {
      addDoc(databaseHelper.pokemonsCollectionRef, selectedPokemon);
      updateDoc(databaseHelper.usersDocumentRef, { currentPokemonId: selectedPokemon.id });
    }
  };

  if (startingPokemons.length === 0) {
    return null;
  }
  return (
    <Modal title={`Hi ${payerName}!`} labelGreen='Confirm' handleGreen={addSelectedPokemon} disableGreen={!selectedPokemon}>
      <div className='flex flex-col gap-4 max-w-lg'>
        <p>Welcome to Poke-todo!</p>
        <p>Profesor Oak has agreed to put one of these Pokemons into your care. Choose your starting Pokemon that will help you complete your real life tasks!</p>
        <div className='flex gap-4 mt-4 justify-center'>
          <PokemonTile id={startingPokemons[0].id} spriteSrc={startingPokemons[0].spriteSrc} name={startingPokemons[0].name} onClick={() => selectPokemon(startingPokemons[0])} />
          <PokemonTile id={startingPokemons[1].id} spriteSrc={startingPokemons[1].spriteSrc} name={startingPokemons[1].name} onClick={() => selectPokemon(startingPokemons[1])} />
          <PokemonTile id={startingPokemons[2].id} spriteSrc={startingPokemons[2].spriteSrc} name={startingPokemons[2].name} onClick={() => selectPokemon(startingPokemons[2])} />
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
