import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stops = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

/* no times, just arrays of destinations
const availableRoadsBetweenStations = stops.reduce((acc, cur) => ({...acc, 
  [cur]:roads
  .filter(road => road.mista === cur).map(road => road.mihin)
  .concat(roads.filter(road => road.mihin === cur).map(road => road.mista))}), {})
*/

/*
const availableRoadsBetweenStations =
  stops.reduce((acc, cur) => ({
    ...acc, 
    [cur]:roads
    .filter(road => road.mista === cur)
    .map(road => ({[road.mihin]: road.kesto}))
    .concat(roads.filter(road => road.mihin === cur)
    .map(road => ({[road.mista]: road.kesto})))
  }), 
  {})
*/
  const availableRoadsBetweenStations =
  stops.reduce((acc, cur) => ({
    ...acc, [cur]:
      roads.filter(road => road.mista === cur)
      .reduce((acc, cur) => ({...acc, [cur.mihin]:cur.kesto}), {})
  }), 
  {})

console.log(availableRoadsBetweenStations)


  const availableRoadsBetweenStationsReversed = 
  stops.reduce((acc, cur) => ({
    ...acc, [cur]:
      roads.filter(road => road.mihin === cur)
      .reduce((acc, cur) => ({...acc, [cur.mista]:cur.kesto}), {})
  }), 
  {})

console.log(availableRoadsBetweenStationsReversed)
  
const availableRoadsBetweenStationsBothWays = 
  Object.keys(availableRoadsBetweenStations).reduce((acc, cur) => ({...acc, [cur]:{
    ...availableRoadsBetweenStations[cur], ...availableRoadsBetweenStationsReversed[cur]
  }}), {})

console.log(availableRoadsBetweenStationsBothWays)


const availableRoutesBetweenStations = Object.keys(lines).reduce((acc, line) => acc.concat(lines[line]), [])
//console.log(availableRoutesBetweenStations)

const yellowRoute = lines.keltainen
//console.log(yellowRoute)
const maxIndex = yellowRoute.length
//console.log(maxIndex)

const availableRoutes = yellowRoute.reduce((acc, cur, index, src) => {
  //console.log(cur)
  
  if(index < maxIndex - 1) {
    return acc.concat([
      "kek"
    ])
  } else {
    return acc
  } 
  }, []
)

console.log(availableRoutes)

const bestRoutes = availableRoadsBetweenStations.R
console.log(bestRoutes)


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
        Nopein reitti: 
      </p>
    </div>
  );
}

export default App;
