import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderText from './components/common/headerText/'
import TitleText from './components/common/titleText/'
import SubtitleOne from './components/common/subtitleOne/'
import SubtitleTwo from './components/common/subtitleTwo/'

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
        <HeaderText text={"Hola"}/>
        <TitleText text={"Hola"}/>
        <SubtitleOne text={"Hola"}/>
        <SubtitleTwo text={"Hola"}/>
      </header>
    </div>
  );
}

export default App;
