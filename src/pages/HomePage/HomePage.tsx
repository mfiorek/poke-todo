import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import Card from '../../components/Card/Card';

const HomePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    database
      .collection('users')
      .doc(currentUser?.uid)
      .get()
      .then((userData) => {
        setName(userData.data()?.name);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='flex flex-col items-center h-full'>
      <p className='text-3xl font-bold m-4'>Poke-todo!</p>
      {name && <h2>Hi {name}!</h2>}
      <div className='flex flex-wrap justify-center w-full h-2/3'>
        <Card title='Title1' className='flex-grow'>Content1</Card>
        <Card title='Title2' className='flex-grow'>Content2</Card>
        <Card title='Title3' className='flex-grow'>Content3</Card>
      </div>
      <div>
        <button onClick={handleLogout} className='bg-red-300 border border-red-800 px-4 py-2 rounded-md text-lg font-semibold text-red-800 cursor-pointer'>
          Log out
        </button>
      </div>
    </div>
  );
};

export default withAuthCheck(HomePage, true);
