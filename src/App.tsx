import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './assets/components/Login';

function App() {
  return (
    <div className="App">
      <Login
        handleLogin={function (
          email: string,
          username: string,
        ): Promise<void> {
          throw new Error('Function not implemented');
        }}
        loading={false}
      />
    </div>
  );
}

export default App;


