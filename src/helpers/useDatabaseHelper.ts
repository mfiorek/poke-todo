import { useAuth } from '../Contexts/AuthContext';
import { database } from '../firebase';

const usersDocumentRef = (userUid: string) => {
  return database.collection('users').doc(userUid);
};

const tasksCollectionRef = (userUid: string) => {
  return database.collection('users').doc(userUid).collection('tasks');
};

const pokemonsCollectionRef = (userUid: string) => {
  return database.collection('users').doc(userUid).collection('pokemons');
};

const itemsCollectionRef = (userUid: string) => {
  return database.collection('users').doc(userUid).collection('items');
};

export default function useDatabaseHelper() {
  const { currentUser } = useAuth();
  if (currentUser?.uid) {
    return {
      usersDocumentRef: usersDocumentRef(currentUser?.uid),
      tasksCollectionRef: tasksCollectionRef(currentUser?.uid),
      pokemonsCollectionRef: pokemonsCollectionRef(currentUser?.uid),
      itemsCollectionRef: itemsCollectionRef(currentUser?.uid),
    };
  }
};
