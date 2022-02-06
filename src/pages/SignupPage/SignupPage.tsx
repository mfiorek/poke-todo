import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../../firebase';
import styles from './SignupPage.module.css';
import { useAuth } from '../../Contexts/AuthContext';
import Card from '../../components/Card/Card';
import CenterCenter from '../../components/CenterCenter/CenterCenter';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoaing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    setErrorMessage('');

    if (!name) {
      setErrorMessage('Please provide Game Name');
      return;
    }
    if (!email) {
      setErrorMessage('Please provide Email');
      return;
    }
    if (!password) {
      setErrorMessage('Please provide Password');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (name && email && password && passwordConfirm === password) {
      setLoaing(true);
      signup(email, password)
        .then((userCredential) => {
          return database.collection('users').doc(userCredential.user?.uid).set({ name: name });
        })
        .then(() => {
          // TODO save the name in redux state (?)
          navigate('/');
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setLoaing(false);
        });
    }
  };

  return (
    <CenterCenter isColumn>
      <Card title='Signup'>
        <CenterCenter isColumn>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <form className={styles.form}>
            <label htmlFor='name'>Game name</label>
            <input id='name' ref={nameRef} className={styles.formInput} />
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} className={styles.formInput} />
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} className={styles.formInput} />
            <label htmlFor='passwordConfirm'>Password Confirmation</label>
            <input id='passwordConfirm' type='password' ref={passwordConfirmRef} className={styles.formInput} />
          </form>
          <button onClick={handleSignup} disabled={loading} className={styles.button}>
            Sign up!
          </button>
        </CenterCenter>
      </Card>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </CenterCenter>
  );
};

export default withAuthCheck(SignupPage, false);
