import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import './assets/scss/App.scss'
import logo from './logo.svg'

function App() {
  return (
    <>
      <div className="row">
        <div className="col s6">coucou</div>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code> src/App.js </code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  )
}

export default App
