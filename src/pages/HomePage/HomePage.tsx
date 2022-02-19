import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { task, TasksReducerState } from '../../state/tasks/taskTypes';
import { addTask, clearTasks } from '../../state/tasks/taskActions';
import { pokemon, PokemonsReducerState } from '../../state/pokemon/pokemonTypes';
import { addPokemon, clearPokemon } from '../../state/pokemon/pokemonActions';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import useDatabaseHelper from '../../helpers/useDatabaseHelper';
import PokeAPIHelper from '../../helpers/PokeapiHelper';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import AddTaskInput from '../../components/AddTaskInput/AddTaskInput';
import TaskCard from '../../components/TaskCard/TaskCard';
import PokemonTile from '../../components/PokemonTile/PokemonTile';

const HomePage: React.FC = () => {
  const tasksDone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => task.done));
  const tasksUndone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => !task.done));
  const pokemons = useSelector<PokemonsReducerState, pokemon[]>((state) => state.pokemons.ownedPokemons);
  const dispatch = useDispatch();
  const databaseHelper = useDatabaseHelper();
  const [userLoading, setUserLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [pokemonsLoading, setPokemonsLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const userPromise = databaseHelper?.usersDocumentRef.get();
    userPromise?.then((userData) => {
      setName(userData.data()?.name);
      setUserLoading(false);
    });

    dispatch(clearTasks());
    const tasksPromise = databaseHelper?.tasksCollectionRef.get();
    tasksPromise?.then((tasks) => {
      tasks.docs.forEach((task) => {
        dispatch(addTask(task.data() as task));
      });
      setTasksLoading(false);
    });

    dispatch(clearPokemon());
    const pokemonsPromise = databaseHelper?.pokemonsCollectionRef.get();
    pokemonsPromise?.then((pokemons) => {
      pokemons.docs.forEach((pokemon) => {
        dispatch(addPokemon(pokemon.data() as pokemon));
      });
      setPokemonsLoading(false);
    });
  }, []);

  const addRandomPokemon = () => {
    const pokemonId = Math.ceil(Math.random() * 150) + 1;
    PokeAPIHelper.getPokemonById(pokemonId).then((pokemon) => {
      dispatch(addPokemon(pokemon));
      databaseHelper?.pokemonsCollectionRef.add(pokemon);
    });
  };

  if (userLoading || tasksLoading || pokemonsLoading) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col items-center min-h-full'>
      <Navbar />
      <div className='flex-grow w-full'>
        {name && <h2>Hi {name}!</h2>}
        <div className='flex flex-wrap justify-center w-full h-2/3'>
          <Card title='Tasks' className='flex-grow max-w-md'>
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
          <Card title='Pokemon' className='flex-grow max-w-md'>
            <div className='flex flex-wrap'>
              {pokemons.map((pokemon) => (
                <PokemonTile key={pokemon.id} name={pokemon.name} spriteSrc={pokemon.spriteSrc} />
              ))}
            </div>
          </Card>
          <Card title='Items' className='flex-grow max-w-md'>
            Content3
          </Card>
        </div>
      </div>
      <button onClick={addRandomPokemon}>Add random Pokemon</button>
      <Footer />
    </div>
  );
};

export default withAuthCheck(HomePage, true);
