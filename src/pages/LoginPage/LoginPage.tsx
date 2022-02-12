import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import FormInput from '../../components/FormInput/FormInput';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [loading, setLoaing] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!email) {
      setEmailError('Please provide Email');
    }
    if (!password) {
      setPasswordError('Please provide Password');
    }
    if (email && password) {
      setLoaing(true);
      login(email, password)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          setGeneralError(err.message);
          setLoaing(false);
        });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <Card title='Login' className='w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4'>
          {generalError && <div className='my-2 px-2 py-3 border border-red-800 bg-red-200 rounded-md text-red-800'>{generalError}</div>}
          <form onSubmit={handleLogin}>
            <FormInput id='email' value={email} onChange={setEmail} type='email' errorMessage={emailError} label='Email' />
            <FormInput id='password' value={password} onChange={setPassword} type='password' errorMessage={passwordError} label='Password' />
            <button type='submit' disabled={loading} className='p-2 text-xl border rounded-md border-green-800 bg-green-700 w-full text-white'>
              Log In!
            </button>
          </form>
      </Card>
      <div>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
};

export default withAuthCheck(LoginPage, false);
