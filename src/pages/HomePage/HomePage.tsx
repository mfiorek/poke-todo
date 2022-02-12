import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
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

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='flex flex-col items-center min-h-full'>
      <Navbar />
      <div className='flex-grow w-full'>
        {name && <h2>Hi {name}!</h2>}
        <div className='flex flex-wrap justify-center w-full h-2/3'>
          <Card title='Title1' className='flex-grow'>
            Content1
          </Card>
          <Card title='Title2' className='flex-grow'>
            Content2
          </Card>
          <Card title='Title3' className='flex-grow'>
            Content3
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuthCheck(HomePage, true);
