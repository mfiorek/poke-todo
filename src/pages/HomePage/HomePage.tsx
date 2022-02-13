import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { task, TasksState } from '../../Redux/types';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import AddTaskInput from '../../components/AddTaskInput/AddTaskInput';
import TaskCard from '../../components/TaskCard/TaskCard';

const HomePage: React.FC = () => {
  const tasksDone = useSelector<TasksState, task[]>((state) => state.tasksState.filter((task) => task.done));
  const tasksUndone = useSelector<TasksState, task[]>((state) => state.tasksState.filter((task) => !task.done));
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
            <AddTaskInput />
            {tasksUndone
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((task) => (
                <TaskCard key={task.id} id={task.id} done={task.done} summary={task.summary} />
              ))}
            {!!tasksUndone.length && (
              <div>
                <hr className='mt-8 mb-4'/>
                <p>Done:</p>
                {tasksDone
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((task) => (
                    <TaskCard key={task.id} id={task.id} done={task.done} summary={task.summary} />
                  ))}
              </div>
            )}
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
