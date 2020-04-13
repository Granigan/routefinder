import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stops = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

/* slightly more verbose way of findinig roads between stations
const availableRoadsBetweenStations = stops.map(stop => ({
  station: stop,
  routes: roads.filter(road => road.mista === stop).map(road => road.mihin)
    .concat(roads.filter(road => road.mihin === stop).map(road => road.mista))
})).reduce((acc, cur) => ({...acc, [cur.station]:cur.routes}), {})
*/

const availableRoadsBetweenStations = stops.reduce((acc, cur) => ({...acc, 
  [cur]:roads
  .filter(road => road.mista === cur).map(road => road.mihin)
  .concat(roads.filter(road => road.mihin === cur).map(road => road.mista))}), {})

const availableRoutes = availableRoadsBetweenStations.R

let start = ''
let finish = ''


function App() {
  return (
    <div className="App">
      <header className="Reittiopas">
      Reittiopas
      </header>
      <p>
        Pysäkit: {stops}
      </p>
      <p>
        Valitse lähtöpiste:
      </p>
      <p>
        Valitse määränpää:
      </p>
      <p>
        Nopein reitti: {availableRoutes}
      </p>
    </div>
  );
}

export default App;
