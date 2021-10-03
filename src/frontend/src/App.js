import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { incidentReportsEndpoint, getAllEndpoint } from './apiWrapper';

const payload = {
  'Geolocation': "Sugar Land", 
  'Manager_Name': "Bernie Sanders", 
  'Department': "Drilling", 
  'Type_of_Hazard': "Oil Spill", 
  'Description': "Everyone was on fire.", 
  'Danger_Level': 10, 
  'Injury_Count': 22, 
  'Death_Count': 6, 
  'NearMiss': 98
}

function App() {
  const [message, setMessage] = useState('No api. :-(');

  fetch(incidentReportsEndpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
        "accept": "application/json",
        "content-type": "application/json"
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