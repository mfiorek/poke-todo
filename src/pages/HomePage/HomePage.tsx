import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import Card from '../../components/Card/Card';
import ContentFlex from '../../components/ContentFlex/ContentFlex';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import { database } from '../../firebase';
import CenterCenter from '../../components/CenterCenter/CenterCenter';

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
    <CenterCenter isColumn>
      <p className={styles.mainTitle}>Poke-todo!</p>
      {name && <h2>Hi {name}!</h2>}
      <ContentFlex>
        <Card title='Title1'>Content1</Card>
        <Card title='Title2'>Content2</Card>
        <Card title='Title3'>Content3</Card>
      </ContentFlex>
      <div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log out
        </button>
      </div>
    </CenterCenter>
  );
};

export default withAuthCheck(HomePage, true);
