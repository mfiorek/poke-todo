import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Card from '../../components/Card/Card';
import CenterCenter from '../../components/CenterCenter/CenterCenter';
import { useAuth } from '../../Contexts/AuthContext';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoaing] = useState(false);

  const handleLogin = () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      setLoaing(true);
      login(emailRef.current?.value, passwordRef.current?.value)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          // TODO implemet error message for the user
          console.log(err.message);
          setLoaing(false);
        });
    }
  };

  return (
    <CenterCenter isColumn>
      <Card title='Login'>
        <CenterCenter isColumn>
          <form className={styles.form}>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={emailRef} className={styles.formInput} />
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={passwordRef} className={styles.formInput} />
          </form>
          <button onClick={handleLogin} disabled={loading} className={styles.button}>
            Log In!
          </button>
        </CenterCenter>
      </Card>
      <div>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </CenterCenter>
  );
};

export default withAuthCheck(LoginPage, false);
