import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [responseText, setResponseText] = useState("");
  useEffect(() => {
    // Example fetch to API
    fetch("/api/test").then(res => res.json()).then(json => setResponseText(json.text));
  }, []);

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
        <p>
          Response text: {responseText}
        </p>
      </header>
    </div>
  );
}

export default App;
