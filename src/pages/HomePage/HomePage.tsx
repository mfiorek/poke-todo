import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setGold } from '../../state/user/userActions';
import { task, TasksReducerState } from '../../state/tasks/taskTypes';
import { addTask, clearTasks } from '../../state/tasks/taskActions';
import { pokemon, PokemonsReducerState } from '../../state/pokemon/pokemonTypes';
import { addPokemon, clearPokemons, setCurrentPokemon } from '../../state/pokemon/pokemonActions';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import { useModal } from '../../Contexts/ModalContext';
import useDatabaseHelper from '../../helpers/useDatabaseHelper';
import PokeAPIHelper from '../../helpers/PokeapiHelper';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import AddTaskInput from '../../components/AddTaskInput/AddTaskInput';
import TaskCard from '../../components/TaskCard/TaskCard';
import PokemonTile from '../../components/PokemonTile/PokemonTile';
import CurrentPokemonBanner from '../../components/CurrentPokemonBanner/CurrentPokemonBanner';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import PlayerBanner from '../../components/PlayerBanner/PlayerBanner';

const HomePage: React.FC = () => {
  const tasksDone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => task.done));
  const tasksUndone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => !task.done));
  const pokemons = useSelector<PokemonsReducerState, pokemon[]>((state) => state.pokemons.ownedPokemons);
  const dispatch = useDispatch();
  const databaseHelper = useDatabaseHelper();
  const { openModal } = useModal();
  const [userLoading, setUserLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [pokemonsLoading, setPokemonsLoading] = useState(true);

  // Subscribe to user data
  useEffect(() => {
    const userUnsubscribe = databaseHelper?.usersDocumentRef.onSnapshot((userData) => {
      dispatch(setUserName(userData.data()?.name));
      dispatch(setGold(userData.data()?.gold || 0));
      dispatch(setCurrentPokemon(userData.data()?.currentPokemonId));
      setUserLoading(false);
    });
    return () => {
      if (userUnsubscribe) userUnsubscribe();
    };
  }, []);

  // Subscribe to task data
  useEffect(() => {
    const tasksUnsubscribe = databaseHelper?.tasksCollectionRef.onSnapshot((tasks) => {
      setTasksLoading(true);
      dispatch(clearTasks());
      tasks.docs.forEach((task) => {
        dispatch(addTask(task.data() as task));
      });
      setTasksLoading(false);
    });
    return () => {
      if (tasksUnsubscribe) tasksUnsubscribe();
    };
  }, []);

  // Subscribe to pokemon data
  useEffect(() => {
    const pokemonsUnsubscribe = databaseHelper?.pokemonsCollectionRef.onSnapshot((pokemons) => {
      if (pokemons.docs.length === 0) {
        openModal(<WelcomeModal />);
      }
      dispatch(clearPokemons());
      pokemons.docs.forEach((pokemon) => {
        dispatch(addPokemon(pokemon.data() as pokemon));
      });
      setPokemonsLoading(false);
    });
    return () => {
      if (pokemonsUnsubscribe) pokemonsUnsubscribe();
    };
  }, []);

  const add500Gold = () => {
    databaseHelper?.usersDocumentRef.get().then((user) => {
      const currentGold = user.data()?.gold || 0;
      databaseHelper?.usersDocumentRef.update({ gold: currentGold + 500 });
    });
  };

  const addRandomPokemon = () => {
    const pokemonId = Math.ceil(Math.random() * 150) + 1;
    PokeAPIHelper.getPokemonById(pokemonId).then((pokemon) => {
      // dispatch(addPokemon(pokemon));
      databaseHelper?.pokemonsCollectionRef.add(pokemon);
    });
  };

  const chooseCurrentPokemon = (id: number) => {
    // dispatch(setCurrentPokemon(id));
    databaseHelper?.usersDocumentRef.update({ currentPokemonId: id });
  };

  if (userLoading || tasksLoading || pokemonsLoading) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col items-center min-h-full'>
      <Navbar />
      <div className='flex-grow w-full'>
        <div id='PokemonAndPlayerBanner' className='flex justify-between bg-emerald-400'>
          <CurrentPokemonBanner />
          <PlayerBanner />
        </div>
        <div id='CardsContainer' className='grid grid-cols-2 xl:grid-cols-4 p-4 gap-4'>
          <Card title='Tasks'>
            <AddTaskInput />
            {tasksUndone
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((task) => (
                <TaskCard key={task.id} id={task.id} done={task.done} summary={task.summary} />
              ))}
            {!!tasksDone.length && (
              <div>
                <hr className='mt-8 mb-4' />
                <p>Done:</p>
                {tasksDone
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((task) => (
                    <TaskCard key={task.id} id={task.id} done={task.done} summary={task.summary} />
                  ))}
              </div>
            )}
          </Card>
          <Card title='Pokemon'>
            <div className='flex flex-wrap gap-2'>
              {pokemons
                .sort((pokeA, pokeB) => pokeA.id - pokeB.id)
                .map((pokemon) => (
                  <PokemonTile key={pokemon.id} id={pokemon.id} name={pokemon.name} spriteSrc={pokemon.spriteSrc} onClick={() => chooseCurrentPokemon(pokemon.id)} />
                ))}
            </div>
          </Card>
          <Card title='Items'>Content3</Card>
          <Card title='Shop'>Content4</Card>
        </div>
      </div>
      <button onClick={addRandomPokemon}>Add random Pokemon</button>
      <button onClick={add500Gold}>Add 500 gold</button>
      <Footer />
    </div>
  );
};

export default withAuthCheck(HomePage, true);
