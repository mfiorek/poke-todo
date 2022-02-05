import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

interface IAuthContext {
  currentUser: firebase.User | null;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user', user?.email, user?.uid);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
