import React, { useState } from 'react'
import routes from './data/reittiopas.json'
import { Container, ButtonGroup, Button, Grid, Input } from '@material-ui/core/'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/'


const StationButtonGroup = stations => (
  <ToggleButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      {stationButtons(stations)}
    </ToggleButtonGroup>
)

const stationButtons = (stations, destination, origin, setDestination, setOrigin) => {
  const selectStation = (station) => {
    if(origin==='') {
      setOrigin(station)
    } else if (destination === '') {
      setDestination(station)
    } else {
      setOrigin(destination)
      setDestination(station)
    }
  }
  
  return stations.map(s => 
    <ToggleButton value={s} key={s} >
      {s}
    </ToggleButton>)
}

const App = () => {
  const [routeTaken, setRouteTaken] = useState([])
  const [tripDuration, setTripDuration] = useState('')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [lineOptions, setLineOptions] = useState('')
  const stations = routes.pysakit
  const roads = routes.tiet
  const lines = routes.linjastot

  const getRoutesForLine = (lineStations) =>
    lineStations.reduce(
      (acc, stop, index) =>
        index < lineStations.length - 1
          ? acc.concat([
              stop + lineStations[index + 1],
              lineStations[index + 1] + stop,
            ])
          : acc,
      []
    )

  const routesAvailable = Array.from(
    new Set(
      Object.keys(lines).reduce(
        (acc, color) => acc.concat(getRoutesForLine(lines[color])),
        []
      )
    )
  )

  const findDuration = (route) =>
    roads
      .filter(
        (road) =>
          (road.mista === route.substring(0, 1) &&
            road.mihin === route.substring(1, 2)) ||
          (road.mihin === route.substring(0, 1) &&
            road.mista === route.substring(1, 2))
      )
      .map((road) => road.kesto)[0]

  const findColour = (route) =>
    Object.keys(lines).reduce((acc, colour) => {
      return getRoutesForLine(lines[colour]).includes(route)
        ? acc.concat([colour])
        : acc
    }, [])

  const findNeighbours = (station) =>
    Array.from(
      new Set(
        routesAvailable
          .filter((route) => route.includes(station))
          .map((route) =>
            route.substring(0, 1) === station
              ? route.substring(1, 2)
              : route.substring(0, 1)
          )
      )
    )

  const routeDetails = routesAvailable.reduce(
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
    stations.reduce(
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

  const neighbourList = stations.reduce(
    (acc, station) => ({ ...acc, [station]: findNeighbours(station) }),
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

      neighbourList[currentStation].forEach((n) => {
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

      const nextStation = stations
        .filter((n) => !stationStatusObject[n].visited)
        .sort(
          (a, b) =>
            stationStatusObject[a].durationFromOrigin -
            stationStatusObject[b].durationFromOrigin
        )[0]

      currentStation = nextStation
    }
  }

  const handleOriginChange = (value) => setOrigin(value.toUpperCase())
  const handleDestinationChange = (value) => setDestination(value.toUpperCase())

  return (
    <Container>
      <div>
        <h1 className="Reittiopas">Esdger-reittihaku</h1>
      </div>
      <Container>
        {StationButtonGroup(stations, origin, destination, setOrigin, setDestination)}
      </Container>
          <div>
            {tripDuration === ''
              ? ''
              : `Nopein reitti on ${routeTaken}, ja kestää ${tripDuration} minuuttia.`}
          </div>
          <div>
            {tripDuration > 0
              ? `Pysäkkien väleillä kulkevat: ${lineOptions}`
              : ''}
          </div>
      
          <div>
            <Input
              placeholder="Origin"
              type="text"
              name="Valitse lähtöpiste:"
              value={origin}
              maxLength="1"
              onChange={({ target }) => handleOriginChange(target.value)}
              ></Input>
            <Input
              placeholder="Destination"
              type="text"
              name="Valitse määränpää:"
              value={destination}
              maxLength="1"
              onChange={({ target }) => handleDestinationChange(target.value)}
              ></Input>
          </div>
          <Button onClick={() => findShortestRoute(origin, destination)}>
            Etsi reitti
          </Button>
    </Container>
  )
}

export default App
