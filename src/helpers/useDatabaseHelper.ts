import { collection, doc } from 'firebase/firestore';
import { useAuth } from '../Contexts/AuthContext';
import { database } from '../firebase';

const usersDocumentRef = (userUid: string) => {
  return doc(database, `users/${userUid}`);
};

const tasksCollectionRef = (userUid: string) => {
  return collection(database, `users/${userUid}/tasks`);
};

const taskDocumentRef = (userUid: string, taskId: string) => {
  return doc(database, `users/${userUid}/tasks/${taskId}`);
};

const pokemonsCollectionRef = (userUid: string) => {
  return collection(database, `users/${userUid}/pokemons`);
};

const itemsCollectionRef = (userUid: string) => {
  return collection(database, `users/${userUid}/items`);
};

const itemDocumentRef = (userUid: string, itemId: number) => {
  return doc(database, `users/${userUid}/items/${itemId}`);
};

export default function useDatabaseHelper() {
  const { currentUser } = useAuth();
  const userId = currentUser?.uid || '';
  return {
    usersDocumentRef: usersDocumentRef(userId),
    tasksCollectionRef: tasksCollectionRef(userId),
    taskDocumentRef: (taskId: string) => taskDocumentRef(userId, taskId),
    pokemonsCollectionRef: pokemonsCollectionRef(userId),
    itemsCollectionRef: itemsCollectionRef(userId),
    itemDocumentRef: (itemId: number) => itemDocumentRef(userId, itemId),
  };
}
