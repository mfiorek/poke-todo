import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';

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
    return <Loader />;
  }
  return (
    <div className='flex flex-col items-center min-h-full'>
      <Navbar />
      <div className='flex-grow w-full'>
        {name && <h2>Hi {name}!</h2>}
        <div className='flex flex-wrap justify-center w-full h-2/3'>
          <Card title='Tasks' className='flex-grow'>
            Content1
          </Card>
          <Card title='Pokemon' className='flex-grow'>
            Content2
          </Card>
          <Card title='Items' className='flex-grow'>
            Content3
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withAuthCheck(HomePage, true);
