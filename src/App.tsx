import styles from './App.module.css';
import Card from './components/Card/Card';
import ContentFlex from './components/ContentFlex/ContentFlex';

function App() {

  return (
    <div className="App">
      <p className={styles.mainTitle}>Poke-todo!</p>
      <ContentFlex>
        <Card title='Title1'>Content1</Card>
        <Card title='Title2'>Content2</Card>
        <Card title='Title3'>Content3</Card>
      </ContentFlex>
    </div>
  )
}

export default App
