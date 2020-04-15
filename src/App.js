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

const createStationStatusObject = () => stations.reduce((acc, station) => 
  ({...acc, [station]: {
    visited: false, 
    durationFromOrigin: Number.MAX_SAFE_INTEGER, 
    arrivedFrom: null }}), {})

const neighbourList = stations.reduce( (acc, station) => ({...acc, 
  [station]: findNeighbours(station)
  }), {})

let origin = 'A'
let destination = 'F'


const findShortestRoute = (origin, destination) => {
  const stationStatusObject = createStationStatusObject()
  
  // lisää eka, merkkaa ekaan tiedot "duration 0", "arrivedFrom"="isOrigin"
  let currentStation = [origin]
  
  stationStatusObject[currentStation] = {
    ...stationStatusObject[currentStation], 
    visited: true, 
    distanceFromOrigin: 0,
    arrivedFrom: "isOrigin"
  }
  
  while(true) {
    if(currentStation === destination) {
      //-> current === destination, backtrackaa reitti ja raportoi tulos
      return {
        to: destination,
        from: origin,
        duration: stationStatusObject[currentStation].durationFromOrigin
      }
    }
    
    //1. hae naapurit
    const neighbours = neighbourList[currentStation]
    console.log(neighbours)
    
    currentStation = neighbours
    .sort((a, b) => 
      routeDetails[currentStation+a].duration - routeDetails[currentStation+b].duration)
    .map(n => {
      const tentativeDuration = routeDetails[currentStation+n].duration 
      + stationStatusObject[currentStation].distanceFromOrigin
      
      if(tentativeDuration < stationStatusObject[n].distanceFromOrigin) {
        stationStatusObject[n] = {
          ...stationStatusObject[n],
          distanceFromOrigin: tentativeDuration,
          arrivedFrom: n
        }
      }
      return n
    }).filter(n => !stationStatusObject[n].visited)[0]
    
    console.log(currentStation)
  }
    
    /*2. käy naapurit läpi ja merkkaa lyhyin matka ja reitti:
        - duration="currentStationDuration"+kaari currentStation+NeighbourStation.duration
        - "arrivedFrom"=current*/
      //3. siirry lähimpänä olevaan käymättömään naapuriiin ja merkkaa "visited"=true 
      
     //*. jos naapureissa on käyty tai reitti niihin on pidempi, ei reittiä löydy
 // }
  
}





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
        Suora reitti: 
        {origin === destination ? "Lähtöpiste ja määränpää ovat samat." :
        !routeExists(origin, destination) ? "Suoraa reittiä ei ole" :
        `Suora reitti löytyy! Reitillä kulkee ${routeDetails[origin+destination].colours} 
        ja matka kestää ${routeDetails[origin+destination].duration} minuuttia.`}
      </p>
      <p>
        Nopein reitti: {findShortestRoute(origin, destination).duration}
      </p>
    </div>
  );
}

export default App;
