import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import Store from './assets/store/Store';


const store = {
  Store: new Store(),
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
    <Provider {...store}>
      <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>
);
reportWebVitals();
