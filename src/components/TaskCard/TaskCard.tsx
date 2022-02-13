import React from 'react';
import { useDispatch } from 'react-redux';
import { checkTask } from '../../Redux/taskActions';

type TaskCardProps = {
  id: string;
  summary: string;
  done: boolean;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { id, summary, done } = props;
  const dispatch = useDispatch();

  const handleCheckTask = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(checkTask(id, event.target.checked))
  }

  return (
    <div className='flex justify-center items-center my-1 border border-slate-300'>
      <div className={`flex justify-center items-center p-3 ${done ? 'bg-slate-200' : 'bg-amber-300'}`}>
        <input id={id} type='checkbox' defaultChecked={done} onChange={handleCheckTask}/>
      </div>
      <label htmlFor={id} className={`flex-grow px-3 ${done && 'line-through'}`}>
        {summary}
      </label>
    </div>
  );
};

export default TaskCard;
