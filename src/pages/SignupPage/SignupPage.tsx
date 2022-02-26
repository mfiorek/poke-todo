import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../../firebase';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';
import Card from '../../components/Card/Card';
import FormInput from '../../components/FormInput/FormInput';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [nick, setNick] = useState('');
  const [nickError, setNickError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [loading, setLoaing] = useState(false);

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNickError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmError('');
    setGeneralError('');

    if (!nick) {
      setNickError('Please provide Nick');
    }
    if (!email) {
      setEmailError('Please provide Email');
    }
    if (!password) {
      setPasswordError('Please provide Password');
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords do not match');
    }
    if (nick && email && password && passwordConfirm === password) {
      setLoaing(true);
      signup(email, password)
        .then((userCredential) => {
          return database.collection('users').doc(userCredential.user?.uid).set({ name: nick });
        })
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
    <div className='flex flex-col justify-start items-center h-full'>
      <img src='../../../static/images/logo.png' alt='Poke-todo' className='m-4 h-20 object-contain' />
      <Card title='Signup' className='w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        {generalError && <div className='my-1 px-2 py-3 border border-red-800 bg-red-200 rounded-md text-red-800'>{generalError}</div>}
        <form onSubmit={handleSignup}>
          <FormInput id='nick' value={nick} onChange={setNick} type='text' errorMessage={nickError} label='Nick' />
          <FormInput id='email' value={email} onChange={setEmail} type='email' errorMessage={emailError} label='Email' />
          <FormInput id='password' value={password} onChange={setPassword} type='password' errorMessage={passwordError} label='Password' />
          <FormInput id='passwordConfirm' value={passwordConfirm} onChange={setPasswordConfirm} type='password' errorMessage={passwordConfirmError} label='Confirm Password' />

          <button type='submit' disabled={loading} className='p-2 text-xl border rounded-md border-green-800 bg-green-700 w-full text-white disabled:opacity-50'>
            {loading ? (
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 animate-spin m-auto' viewBox='0 0 24 24' stroke='currentColor' fill='currentColor'>
                <path d='M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z' />
              </svg>
            ) : (
              <>Sign up!</>
            )}
          </button>
        </form>
      </Card>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
};

export default withAuthCheck(SignupPage, false);
