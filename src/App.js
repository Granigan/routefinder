import React from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

const stations = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

const getRoutesForLine = lineStations => 
  lineStations.reduce((acc, stop, index) => 
    index < lineStations.length - 1 
      ? acc.concat([stop+lineStations[index+1], lineStations[index+1]+stop]) 
      : acc
    , [])

const routesAvailable = 
  Array.from(new Set(Object.keys(lines).reduce((acc, color) => 
  acc.concat(getRoutesForLine(lines[color])), [])))
  
const routeExists = (origin, destination) => routesAvailable.includes(origin+destination)

const findDuration = route =>
  roads.filter(road => 
    road.mista == route.substring(0,1) && road.mihin == route.substring(1,2) ||
    road.mihin == route.substring(0,1) && road.mista == route.substring(1,2) )
    .map(road => road.kesto)[0]

const findColour = route =>
  Object.keys(lines).reduce((acc, colour) => {
    return getRoutesForLine(lines[colour]).includes(route) ? acc.concat([colour]) : acc    
  }, [])

const findNeighbours = station => 
    Array.from(new Set(routesAvailable.filter(route => route
    .includes(station))
    .map(route => 
      route.substring(0,1)===station ? route.substring(1,2) : route.substring(0,1))
  ))

const routeDetails = routesAvailable.map(route => ({
  [route]: {
    origin: route.substring(0,1), 
    destination: route.substring(1,2,), 
    duration: findDuration(route),
    colours: findColour(route)}
}))

const stationTracking = stations.map(station => 
  ({[station]: {visited: false, distanceFromOrigin: Number.MAX_SAFE_INTEGER, arrivedFrom: null }}))


const stationDetails = stations.map(station => 
  ({[station]: {neighbours: findNeighbours(station)}}))

console.log(stationDetails, stationTracking, routeDetails)





























const availableRoadsBetweenStations =
  stations.reduce((acc, cur) => ({
    ...acc, [cur]:
      roads.filter(road => road.mista === cur)
      .reduce((acc, cur) => ({...acc, [cur.mihin]:cur.kesto}), {})
  }), 
  {})

const availableRoadsBetweenStationsReversed = 
  stations.reduce((acc, cur) => ({
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
  stations.reduce((acc, cur) => ({...acc, [cur]:{
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
        Pysäkit: {stations}
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
