import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { clearTasks } from '../../Redux/taskActions';

const Navbar: React.FC = (props) => {
  const { logout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(clearTasks());
  }

  return (
    <nav className={`w-full flex justify-between bg-emerald-800 text-2xl text-white font-semibold vt323`}>
      <div className={`flex items-center`}>
        <img src='../../../static/images/logo.png' alt='Poke-todo' className='px-3 h-10 object-contain' />
        <NavLink className={(props) => `p-3 border-b-4 hover:bg-emerald-500 ${props.isActive ? 'border-emerald-300' : 'border-emerald-800 hover:border-emerald-500'}`} end to='/'>
          Tasks
        </NavLink>
        <NavLink
          className={(props) => `p-3 border-b-4 hover:bg-emerald-500 ${props.isActive ? 'border-emerald-300' : 'border-emerald-800 hover:border-emerald-500'}`}
          end
          to='/settings'
        >
          Settings
        </NavLink>
      </div>
      <a onClick={handleLogout} className='p-3 cursor-pointer hover:bg-emerald-500'>
        Log out
      </a>
    </nav>
  );
};

export default Navbar;
