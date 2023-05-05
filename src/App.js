import './App.css';
import React from 'react';
import Navigator from './Navigator';
import { LoginContextProvider } from './Contexts/login-context';


function App() {

  return (
    <div className="App">
      <LoginContextProvider>
        <Navigator />
      </LoginContextProvider>
    </div>
    //  <div>
    //  <header><h1>관리자 페이지</h1></header>
    //  <Manage_Main/>
    //</div>
  );
}

export default App;
