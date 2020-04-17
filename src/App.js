import React, { useState } from 'react'
import { Container, Button } from '@material-ui/core/'
import StationButtons from './components/StationButtons'
import {
  getStations,
  getAvailableRoutes,
  findDuration,
  findColour,
  getNeighbourList
} from './dataService'

const RouteFinder = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [routeTaken, setRouteTaken] = useState([])
  const [tripDuration, setTripDuration] = useState('')
  const [lineOptions, setLineOptions] = useState('')

  const routeDetails = getAvailableRoutes().reduce(
    (acc, route) => ({
      ...acc,
      [route]: {
        origin: route.substring(0, 1),
        destination: route.substring(1, 2),
        duration: findDuration(route),
        colours: findColour(route),
      },
    }),
    {}
  )

  const createStationStatusObject = () =>
    getStations().reduce(
      (acc, station) => ({
        ...acc,
        [station]: {
          visited: false,
          durationFromOrigin: Number.MAX_SAFE_INTEGER,
          arrivedFrom: null,
        },
      }),
      {}
    )

  const createLineOptions = (route) =>
    setLineOptions(
      route.reduce(
        (acc, station, index) =>
          index < route.length - 1
            ? acc +
              `${station}-${route[index + 1]}: ${findColour(
                station + route[index + 1]
              )} `
            : acc,
        ''
      )
    )

  const backtrackRoute = (currentStation, stationStatusObject) => {
    let route = []
    let curStation = currentStation

    while (stationStatusObject[curStation].arrivedFrom !== 'isOrigin') {
      route = route.concat(curStation)
      curStation = stationStatusObject[curStation].arrivedFrom
    }

    route = route.concat(curStation).reverse()

    setRouteTaken(route)
    createLineOptions(route)
    return route
  }

  const findShortestRoute = (origin, destination) => {
    const stationStatusObject = createStationStatusObject()
    let currentStation = origin
    stationStatusObject[currentStation] = {
      ...stationStatusObject[currentStation],
      visited: true,
      durationFromOrigin: 0,
      arrivedFrom: 'isOrigin',
    }

    while (true) {
      stationStatusObject[currentStation] = {
        ...stationStatusObject[currentStation],
        visited: true,
      }
      if (currentStation === destination) {
        setTripDuration(stationStatusObject[currentStation].durationFromOrigin)
        return {
          to: destination,
          from: origin,
          duration: stationStatusObject[currentStation].durationFromOrigin,
          routeTaken: backtrackRoute(currentStation, stationStatusObject),
        }
      }

      getNeighbourList()[currentStation].forEach((n) => {
        const tentativeDuration =
          routeDetails[currentStation + n].duration +
          stationStatusObject[currentStation].durationFromOrigin

        if (tentativeDuration < stationStatusObject[n].durationFromOrigin) {
          stationStatusObject[n] = {
            ...stationStatusObject[n],
            durationFromOrigin: tentativeDuration,
            arrivedFrom: currentStation,
          }
        }
      })

      const nextStation = getStations()
        .filter((n) => !stationStatusObject[n].visited)
        .sort(
          (a, b) =>
            stationStatusObject[a].durationFromOrigin -
            stationStatusObject[b].durationFromOrigin
        )[0]

      currentStation = nextStation
    }
  }

  return (
    <Container>
      <div>
        <h1 className="Reittiopas">Esdger-reittihaku</h1>
      </div>
      <Container>
        {StationButtons(
          getStations(),
          origin,
          destination,
          setOrigin,
          setDestination
        )}
      </Container>
      <div>
        {tripDuration === ''
          ? ''
          : `Nopein reitti on ${routeTaken}, ja kestää ${tripDuration} minuuttia.`}
        {tripDuration > 0 ? `Pysäkkien väleillä kulkevat: ${lineOptions}` : ''}
      </div>
      <div>{`Origin: ${origin} Destination: ${destination}`}</div>
      <Button onClick={() => findShortestRoute(origin, destination)}>
        Etsi reitti
      </Button>
    </Container>
  )
}

const App = () => <RouteFinder />

export default App
