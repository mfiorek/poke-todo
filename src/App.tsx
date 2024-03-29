import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { AuthProvider } from './Contexts/AuthContext';
import { ModalProvider } from './Contexts/ModalContext';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/' element={<HomePage />} />
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
