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
          return database.collection('users').doc(userCredential.user?.uid).set({ nick: nick });
        })
        .then(() => {
          // TODO save the name in redux state (?)
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
    <Card title='Signup' className='w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        {generalError && <div className='my-1 px-2 py-3 border border-red-800 bg-red-200 rounded-md text-red-800'>{generalError}</div>}
        <form onSubmit={handleSignup}>
          <FormInput id='nick' value={nick} onChange={setNick} type='text' errorMessage={nickError} label='Nick' />
          <FormInput id='email' value={email} onChange={setEmail} type='email' errorMessage={emailError} label='Email' />
          <FormInput id='password' value={password} onChange={setPassword} type='password' errorMessage={passwordError} label='Password' />
          <FormInput id='passwordConfirm' value={passwordConfirm} onChange={setPasswordConfirm} type='password' errorMessage={passwordConfirmError} label='Confirm Password' />

          <button type='submit' disabled={loading} className='p-2 text-xl border rounded-md border-green-800 bg-green-700 w-full text-white'>
            Sign up!
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
