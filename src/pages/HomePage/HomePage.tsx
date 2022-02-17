import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { task, TasksState } from '../../Redux/types';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import { addTask, clearTasks } from '../../Redux/taskActions';
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
  const dispatch = useDispatch();
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
    dispatch(clearTasks());
    const setTasksFromDatabase = async () => {
      const tasks = await database.collection('users').doc(currentUser?.uid).collection('tasks').get();
      tasks.docs.forEach((task) => {
        dispatch(addTask(task.data() as task));
      });
    };
    setTasksFromDatabase();
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
            <AddTaskInput userUid={currentUser?.uid} />
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
