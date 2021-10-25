import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SocketProvider } from './context/socket-context';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

