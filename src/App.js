import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stops = routes.pysakit
const roads = routes.tiet
console.log(roads)
const lines = routes.linjastot

function App() {
  return (
    <div className="App">
      <header className="Reittiopas">
      Reittiopas
      </header>
      Pysäkit: {stops}
    </div>
  );
}

export default App;
