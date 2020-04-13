import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stops = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

const availableRoadsBetweenStations =
  stops.reduce((acc, cur) => ({
    ...acc, [cur]:
      roads.filter(road => road.mista === cur)
      .reduce((acc, cur) => ({...acc, [cur.mihin]:cur.kesto}), {})
  }), 
  {})

const availableRoadsBetweenStationsReversed = 
  stops.reduce((acc, cur) => ({
    ...acc, [cur]:
      roads.filter(road => road.mihin === cur)
      .reduce((acc, cur) => ({...acc, [cur.mista]:cur.kesto}), {})
  }), 
  {})

const availableRoadsBetweenStationsBothWays = 
  Object.keys(availableRoadsBetweenStations).reduce((acc, cur) => ({...acc, [cur]:{
    ...availableRoadsBetweenStations[cur], ...availableRoadsBetweenStationsReversed[cur]
  }}), {})

console.log(availableRoadsBetweenStationsBothWays)

const yellowRoute = lines.keltainen
//console.log(yellowRoute)
const maxIndex = yellowRoute.length
//console.log(maxIndex)

const availableRoutes = yellowRoute.reduce((acc, cur, index, src) => {
  if(index < maxIndex - 1) {
    
    return {...acc, [cur]:{[src[index+1]]:["keltainen"]} }
  } else {
    return acc
  } 
  }, {}
)

console.log(availableRoutes)

const bestRoutes = availableRoadsBetweenStationsBothWays.R.D
//console.log(bestRoutes)
const chosenLine = availableRoutes.E.F

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
        Nopein reitti: {bestRoutes} {chosenLine}
      </p>
    </div>
  );
}

export default App;
