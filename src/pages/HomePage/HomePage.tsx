import React from 'react';
import styles from './HomePage.module.css';
import Card from '../../components/Card/Card';
import ContentFlex from '../../components/ContentFlex/ContentFlex';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';

const HomePage: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <p className={styles.mainTitle}>Poke-todo!</p>
      <ContentFlex>
        <Card title='Title1'>Content1</Card>
        <Card title='Title2'>Content2</Card>
        <Card title='Title3'>Content3</Card>
      </ContentFlex>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </>
  );
};

export default withAuthCheck(HomePage, true);
