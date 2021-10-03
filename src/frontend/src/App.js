import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { incidentReportsEndpoint, getAllEndpoint } from './apiWrapper';


function App() {
  const [message, setMessage] = useState('No api. :-(');

    //getAllEndPoint fetch
    fetch(getAllEndpoint("foo", "bar"), {
    method: 'GET',
    headers: {
        "content-type": "application/json",
        "accept": "application/json"
    }
  })
  .then(respObj => respObj.json())
     .then(json => setMessage(json.message));

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
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;