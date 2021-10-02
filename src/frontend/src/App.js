import logo from './logo.svg';
import './App.css';
import { submitIncident } from './apiWrapper';

async function App() {
  const message = await submitIncident({});
  console.log(message);
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
        <p>{message.message}</p>
      </header>
    </div>
  );
}

export default App;
