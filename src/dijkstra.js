import {
  getStations,
  getNeighbourList,
  getRouteDetails,
  findColour,
} from './dataService'

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

export const findShortestRoute = (
  origin,
  destination,
  setTripDuration,
  setRouteTaken,
  setLineOptions
) => {
  let stationStatusObject = createStationStatusObject()
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

      const route = backtrackRoute(currentStation, stationStatusObject)
      setRouteTaken(route)
      createLineOptions(route, setLineOptions)
      return {
        duration: stationStatusObject[currentStation].durationFromOrigin,
        routeTaken: backtrackRoute(currentStation, stationStatusObject),
      }
    }

    stationStatusObject = setTentativeDurationsForNeighbours(
      currentStation,
      stationStatusObject
    )
    currentStation = getNextStation(stationStatusObject)
  }
}

const setTentativeDurationsForNeighbours = (
  currentStation,
  stationStatusObject
) => {
  getNeighbourList()[currentStation].forEach((n) => {
    const tentativeDuration =
      getRouteDetails()[currentStation + n].duration +
      stationStatusObject[currentStation].durationFromOrigin

    if (tentativeDuration < stationStatusObject[n].durationFromOrigin) {
      stationStatusObject[n] = {
        ...stationStatusObject[n],
        durationFromOrigin: tentativeDuration,
        arrivedFrom: currentStation,
      }
    }
  })
  return stationStatusObject
}

const getNextStation = (stationStatusObject) =>
  getStations()
    .filter((n) => !stationStatusObject[n].visited)
    .sort(
      (a, b) =>
        stationStatusObject[a].durationFromOrigin -
        stationStatusObject[b].durationFromOrigin
    )[0]

const backtrackRoute = (finalStation, stationStatusObject) => {
  let route = []
  let currentStation = finalStation

  while (stationStatusObject[currentStation].arrivedFrom !== 'isOrigin') {
    route = route.concat(currentStation)
    currentStation = stationStatusObject[currentStation].arrivedFrom
  }

  return route.concat(currentStation).reverse()
}

const createLineOptions = (route, setLineOptions) =>
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

export default findShortestRoute
