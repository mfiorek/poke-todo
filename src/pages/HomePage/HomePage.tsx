import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setGold } from '../../state/user/userActions';
import { UserReducerState } from '../../state/user/userTypes';
import { task, TasksReducerState } from '../../state/tasks/taskTypes';
import { addTask, clearTasks } from '../../state/tasks/taskActions';
import { pokemon, PokemonsReducerState } from '../../state/pokemon/pokemonTypes';
import { addPokemon, clearPokemons, setCurrentPokemon } from '../../state/pokemon/pokemonActions';
import { item, ItemsReducerState } from '../../state/items/itemTypes';
import { addItem, clearItems } from '../../state/items/itemActions';
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
import ItemTile from '../../components/ItemTile/ItemTile';
import Modal from '../../components/Modal/Modal';

const HomePage: React.FC = () => {
  const tasksDone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => task.done));
  const tasksUndone = useSelector<TasksReducerState, task[]>((state) => state.tasks.filter((task) => !task.done));
  const pokemons = useSelector<PokemonsReducerState, pokemon[]>((state) => state.pokemons.ownedPokemons);
  const items = useSelector<ItemsReducerState, item[]>((state) => state.items);
  const gold = useSelector<UserReducerState, number>((state) => state.user.gold);
  const dispatch = useDispatch();
  const databaseHelper = useDatabaseHelper();
  const { openModal } = useModal();
  const [userLoading, setUserLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [pokemonsLoading, setPokemonsLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

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

  // Subscribe to items data
  useEffect(() => {
    const itemsUnsubscribe = databaseHelper?.itemsCollectionRef.onSnapshot((items) => {
      if (items.docs.length === 0) {
        getAllItems();
      }
      dispatch(clearItems());
      items.docs.forEach((item) => {
        dispatch(addItem(item.data() as item));
      });
      setItemsLoading(false);
    });
    return () => {
      if (itemsUnsubscribe) itemsUnsubscribe();
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

  const getAllItems = () => {
    // Hardcoded list of items to get (only several needed of a total 1607)
    const itemsIds = [2, 3, 4, 17, 24, 25, 26, 27, 28];
    itemsIds.forEach((id) => {
      PokeAPIHelper.getItemById(id).then((item) => {
        databaseHelper?.itemsCollectionRef.add(item);
      });
    });
  };

  const chooseCurrentPokemon = (id: number) => {
    // dispatch(setCurrentPokemon(id));
    databaseHelper?.usersDocumentRef.update({ currentPokemonId: id });
  };

  const showBuyItemModal = (item: item) => {
    const buyItem = () => {
      databaseHelper?.itemsCollectionRef
        .where('id', '==', item.id)
        .get()
        .then((items) => {
          items.docs.forEach((item) => {
            const currentQuantity = item.data()?.quantity;
            item.ref.update({ quantity: currentQuantity + 1 });
          });
        });

      databaseHelper?.usersDocumentRef.update({ gold: gold - item.price });
    };

    if (item.price > gold) {
      openModal(
        <Modal labelGreen='Ok'>
          <p>
            You don't have enough ({item.price}) gold to buy <span className='capitalize'>{item.name}</span> 😔
          </p>
        </Modal>,
      );
    } else {
      openModal(
        <Modal labelGreen='Buy' labelRed="Don't buy" handleGreen={buyItem}>
          <p>
            Are you sure you want to buy <span className='capitalize'>{item.name}</span> for {item.price} gold?
          </p>
        </Modal>,
      );
    }
  };

  if (userLoading || tasksLoading || pokemonsLoading || itemsLoading) {
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
          <Card title='Items'>
            <div className='flex flex-wrap gap-6'>
              {items
                .sort((itemA, itemB) => itemA.id - itemB.id)
                .filter((item) => item.quantity > 0)
                .map((item) => (
                  <ItemTile key={item.id} name={item.name} quantity={item.quantity} spriteSrc={item.spriteSrc} />
                ))}
            </div>
          </Card>
          <Card title='Shop'>
            <div className='flex flex-wrap gap-2'>
              {items
                .sort((itemA, itemB) => itemA.id - itemB.id)
                .map((item) => (
                  <ItemTile key={item.id} name={item.name} price={item.price} spriteSrc={item.spriteSrc} onClick={() => showBuyItemModal(item)} />
                ))}
            </div>
          </Card>
        </div>
      </div>
      <button onClick={addRandomPokemon}>Add random Pokemon</button>
      <button onClick={add500Gold}>Add 500 gold</button>
      <Footer />
    </div>
  );
};

export default withAuthCheck(HomePage, true);
