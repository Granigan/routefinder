import React, { useState } from 'react';
//import './App.css';
import routes from './data/reittiopas.json'

function App() {
  const stations = routes.pysakit
  const roads = routes.tiet
  const lines = routes.linjastot
  const [routeTaken, setRouteTaken] = useState([])
  
  let origin = 'A'
  let destination = 'B'

  const getRoutesForLine = lineStations => 
    lineStations.reduce((acc, stop, index) => 
      index < lineStations.length - 1 
        ? acc.concat([stop+lineStations[index+1], lineStations[index+1]+stop]) 
        : acc, [])

  const routesAvailable = 
    Array.from(new Set(Object.keys(lines).reduce((acc, color) => 
    acc.concat(getRoutesForLine(lines[color])), [])))
    
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


  const backtrackRoute = (currentStation, stationStatusObject) => {
    let route = []
    let curStation = currentStation
    
    while(stationStatusObject[curStation].arrivedFrom !== "isOrigin"){
      route = route.concat(curStation)
      curStation = stationStatusObject[curStation].arrivedFrom
    }
    
    route = route.concat(curStation).reverse()
    
    setRouteTaken(route)
    return route
  }
  
  const findShortestRoute = (origin, destination) => {
    const stationStatusObject = createStationStatusObject()
    
    console.log(stationStatusObject, neighbourList)
    
    // lisää eka, merkkaa ekaan tiedot "duration 0", "arrivedFrom"="isOrigin"
    let currentStation = origin
    
    stationStatusObject[currentStation] = {
      ...stationStatusObject[currentStation], 
      visited: true, 
      durationFromOrigin: 0,
      arrivedFrom: "isOrigin"
    }
    let i = 8

    while(i > 0) {
      i--
      console.log(`searching for a route from ${origin} to ${destination}, 
      currently at ${currentStation}, looking at neigbhours ${neighbourList[currentStation]}`)
      
      
      if(currentStation === destination) {
        //-> current === destination, backtrackaa reitti ja raportoi tulos
        return {
          to: destination,
          from: origin,
          duration: stationStatusObject[currentStation].durationFromOrigin,
          routeTaken: backtrackRoute(currentStation, stationStatusObject)
        }
      }
      
      //1. hae naapurit
      const neighbours = neighbourList[currentStation]
      currentStation = neighbours
      .sort((a, b) => 
      routeDetails[currentStation+a].duration - routeDetails[currentStation+b].duration)
      .map(n => {
        const tentativeDuration = routeDetails[currentStation+n].duration 
        + stationStatusObject[currentStation].durationFromOrigin
        
        if(tentativeDuration < stationStatusObject[n].durationFromOrigin) {
          stationStatusObject[n] = {
            ...stationStatusObject[n],
            durationFromOrigin: tentativeDuration,
            arrivedFrom: currentStation
          }
        }
        return n
      }).filter(n => !stationStatusObject[n].visited)[0]
      console.log(`finished setting current station to ${currentStation}`)
    }
    
    /*2. käy naapurit läpi ja merkkaa jos tämä reitti on aiempaa lyhyempi:
    - duration="currentStationDuration"+kaari currentStation+NeighbourStation.duration
    - "arrivedFrom"=current*/
    //3. siirry lähimpänä olevaan käymättömään naapuriiin ja merkkaa "visited"=true 
    
    //*. jos naapureissa on käyty tai reitti niihin on pidempi, ei reittiä löydy
    // }
    
  }


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
      <button onClick = {() => findShortestRoute(origin, destination)}>Etsi reitti</button>
      <p>
        Nopein reitti: {routeTaken}
      </p>
    </div>
  );
}

export default App;
