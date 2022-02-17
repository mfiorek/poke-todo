import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Contexts/AuthContext';
import { useModal } from '../../Contexts/ModalContext';
import { database } from '../../firebase';
import { checkTask, deleteTask } from '../../Redux/taskActions';
import Modal from '../Modal/Modal';

type TaskCardProps = {
  id: string;
  summary: string;
  done: boolean;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { id, summary, done } = props;
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { openModal } = useModal();

  const handleCheckTask = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(checkTask(id, event.target.checked));
    const taskPreUpdate = await database.collection('users').doc(currentUser?.uid).collection('tasks').doc(id).get();
    database
      .collection('users')
      .doc(currentUser?.uid)
      .collection('tasks')
      .doc(id)
      .set({ ...taskPreUpdate.data(), done: event.target.checked });
  };

  const handleDeleteTask = () => {
    const handleDelete = async () => {
      dispatch(deleteTask(id));
      database.collection('users').doc(currentUser?.uid).collection('tasks').doc(id).delete();
    };

    openModal(
      <Modal title='Are you sure?' labelGreen='Leave it' labelRed='Delete' handleRed={handleDelete}>
        <p>Do you really want to delete task:</p>
        <p className='my-4 font-bold'>{summary}</p>
        <p>It will be forever lost 😢</p>
      </Modal>,
    );
  };

  return (
    <div className='relative flex justify-center items-center my-1 border border-slate-300'>
      <div className={`flex justify-center items-center p-3 ${done ? 'bg-slate-200' : 'bg-amber-300'}`}>
        <input id={id} type='checkbox' defaultChecked={done} onChange={handleCheckTask} />
      </div>
      <label htmlFor={id} className={`flex-grow px-3 ${done && 'line-through'}`}>
        {summary}
      </label>
      <button className='absolute right-2 top-1/2 -translate-y-1/2 text-red-700' onClick={handleDeleteTask}>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.75}
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      </button>
    </div>
  );
};

export default TaskCard;
