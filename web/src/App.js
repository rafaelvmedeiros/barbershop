import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <Routes />
          <ToastContainer
            autoClose={8000}
            position="top-center"
            className="toast-container"
            toastClassName="dark-toast"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
