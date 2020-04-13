import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stops = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

const lineReduce = lineStations => 
  lineStations.reduce((acc, stop, index, src) => 
    index < lineStations.length - 1 
      ? acc.concat([stop+lineStations[index+1], lineStations[index+1]+stop]) 
      : acc
    , [])

const linesAvailable = 
  Object.keys(lines).reduce((acc, color) => 
  acc.concat(lineReduce(lines[color])), [])
    
console.log(linesAvailable)

const routeExists = (from, to) => linesAvailable.includes(from+to)

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


let origin = 'G'
let destination = 'F'

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
        Nopein reitti: 
        {origin === destination ? "Lähtöpiste ja määränpää ovat samat." :
        routeExists(origin, destination) ? "Suora reitti löytyy!" : "Suoraa reittiä ei ole"}
        {availableRoutes[origin][destination]} 
        {availableRoadsBetweenStationsBothWays[origin][destination]} 
      </p>
    </div>
  );
}

export default App;
