import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Nav from './components/Nav';
import App from './App';
import reportWebVitals from './reportWebVitals';

function NavWithLocation() {
  const location = useLocation();
  const currentPage = location.pathname;
  return <Nav currentPage={currentPage} />;
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <NavWithLocation />
          <App />
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
