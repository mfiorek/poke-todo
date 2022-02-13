import React from 'react';
import { useDispatch } from 'react-redux';
import { checkTask, deleteTask } from '../../Redux/taskActions';

type TaskCardProps = {
  id: string;
  summary: string;
  done: boolean;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { id, summary, done } = props;
  const dispatch = useDispatch();

  const handleCheckTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(checkTask(id, event.target.checked));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
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
