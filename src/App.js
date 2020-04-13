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



const listRoutesPerLine = lineName => {
  const curRoute = lines[lineName]
  const maxIndex = curRoute.length

  return curRoute.reduce((acc, cur, index, src) => {
    if(index < maxIndex - 1) {
      return {...acc, 
        [cur]:{[src[index+1]]:[lineName]},
      }
    } else {
      return acc
    }
    }, {}
  )
}

const listRoutesPerLineReversed = lineName => {
  const curRoute = lines[lineName]
  const maxIndex = curRoute.length

  return curRoute.reduce((acc, cur, index, src) => {
    if(index < maxIndex - 1) {
      return {...acc, 
        [src[index+1]]:{[cur]:[lineName]}
      }
    } else {
      return acc
    }
    }, {}
  )
}

const availableRoutes =
  stops.reduce((acc, cur) => ({...acc, [cur]:{
    ...listRoutesPerLine("keltainen")[cur], 
    ...listRoutesPerLineReversed("keltainen")[cur], 
    ...listRoutesPerLine("sininen")[cur],
    ...listRoutesPerLineReversed("sininen")[cur],
    ...listRoutesPerLine("punainen")[cur],
    ...listRoutesPerLineReversed("punainen")[cur],
    ...listRoutesPerLine("vihreä")[cur],
    ...listRoutesPerLineReversed("vihreä")[cur]
}}), {})

let origin = 'C'
let destination = 'D'

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
        Valitse lähtöpiste: {origin}
      </p>
      <p>
        Valitse määränpää: {destination}
      </p>
      <p>
        Nopein reitti: {availableRoutes[origin][destination]} {availableRoadsBetweenStationsBothWays[origin][destination]} 
      </p>
    </div>
  );
}

export default App;
