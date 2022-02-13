import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { database } from '../../firebase';
import { addTask } from '../../Redux/taskActions';
import { task } from '../../Redux/types';

interface AddTaskInputProps {
  userUid: string | undefined;
}

const AddTaskInput: React.FC<AddTaskInputProps> = ({ userUid }) => {
  const dispatch = useDispatch();
  const [taskSummary, setTaskSummary] = useState('');

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task: task = {id: `${userUid}${Date.now()}`, createdAt: Date.now(), done: false, summary: taskSummary}
    dispatch(addTask(task));
    setTaskSummary('');
    database.collection('users').doc(userUid).collection('tasks').doc(task.id).set(task);
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
