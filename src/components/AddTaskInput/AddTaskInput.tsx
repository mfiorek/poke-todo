import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Contexts/AuthContext';
import { addTask } from '../../state/tasks/taskActions';
import { task } from '../../state/tasks/taskTypes';
import useDatabaseHelper from '../../helpers/useDatabaseHelper';

const AddTaskInput: React.FC = () => {
  const { currentUser } = useAuth();
  const databaseHelper = useDatabaseHelper();
  const dispatch = useDispatch();
  const [taskSummary, setTaskSummary] = useState('');

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task: task = { id: `${currentUser?.uid}${Date.now()}`, createdAt: Date.now(), done: false, summary: taskSummary };
    dispatch(addTask(task));
    databaseHelper?.tasksCollectionRef.doc(task.id).set(task);
    setTaskSummary('');
  };

  return (
    <form onSubmit={handleAddTask}>
      <div className='flex gap-2 relative'>
        <input
          id='task'
          value={taskSummary}
          onChange={(summary) => setTaskSummary(summary.target.value)}
          type='text'
          placeholder='New task'
          className='flex-grow p-2 border focus:outline-none'
        />
        <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AddTaskInput;
