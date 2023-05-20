import './App.css';
import React from 'react';
import Navigator from './Navigator';
import { LoginContextProvider } from './Contexts/login-context';

function App() {

  return (
    <div className="App" >
      <LoginContextProvider>
        <Navigator/>
      </LoginContextProvider>
    </div>
  );
}

export default App;
