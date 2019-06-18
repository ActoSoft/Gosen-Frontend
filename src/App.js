import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainButton from './components/common/mainButton/'
import SecondaryButton from './components/common/secondaryButton/'
import ThirdButton from './components/common/thirdButton/'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MainButton />
        <br/>
        <br/>
        <SecondaryButton />
        <br/>
        <br/>
        <ThirdButton />
      </header>
    </div>
  );
}

export default App;
