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
      : acc, [])

const routesAvailable = 
  Array.from(new Set(Object.keys(lines).reduce((acc, color) => 
  acc.concat(getRoutesForLine(lines[color])), [])))
  
const routeExists = (origin, destination) => routesAvailable.includes(origin+destination)

const findDuration = route =>
  roads.filter(road => 
    (road.mista === route.substring(0,1) && road.mihin === route.substring(1,2)) ||
    (road.mihin === route.substring(0,1) && road.mista === route.substring(1,2)) )
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

const routeDetails = routesAvailable.reduce( (acc, route) => ({...acc, 
  [route]: {
    origin: route.substring(0,1), 
    destination: route.substring(1,2,), 
    duration: findDuration(route),
    colours: findColour(route)}
}), {})

const stationTracking = stations.map(station => 
  ({[station]: {visited: false, distanceFromOrigin: Number.MAX_SAFE_INTEGER, arrivedFrom: null }}))

const stationDetails = stations.map(station => 
  ({[station]: {neighbours: findNeighbours(station)}}))

let origin = 'A'
let destination = 'C'

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
        !routeExists(origin, destination) ? "Suoraa reittiä ei ole" :
        `Suora reitti löytyy! Reitillä kulkee ${routeDetails[origin+destination].colours} 
        ja matka kestää ${routeDetails[origin+destination].duration} minuuttia.`}
      </p>
    </div>
  );
}

export default App;
