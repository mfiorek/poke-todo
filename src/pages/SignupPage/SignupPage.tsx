import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';
import { useAuth } from '../../Contexts/AuthContext';
import Card from '../../components/Card/Card';
import CenterCenter from '../../components/CenterCenter/CenterCenter';
import { withAuthCheck } from '../../components/withAuthCheck/withAuthCheck';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoaing] = useState(false);

  const handleSignup = () => {
    if (emailRef.current?.value && passwordRef.current?.value && passwordConfirmRef.current?.value === passwordConfirmRef.current?.value) {
      setLoaing(true);
      signup(emailRef.current?.value, passwordRef.current?.value)
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
      <Card title='Signup'>
        <CenterCenter isColumn>
          <form className={styles.form}>
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
