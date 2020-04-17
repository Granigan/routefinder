import {
  getStations,
  getNeighbourList,
  getRouteDetails,
  findColour,
} from './dataService'

export const findShortestRoute = (
  origin,
  destination,
  setTripDuration,
  setRouteTaken,
  setLineOptions
) => {
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
        routeTaken: backtrackRoute(
          currentStation,
          stationStatusObject,
          setRouteTaken,
          createLineOptions,
          setLineOptions
        ),
      }
    }

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

const backtrackRoute = (
  currentStation,
  stationStatusObject,
  setRouteTaken,
  createLineOptions,
  setLineOptions
) => {
  let route = []
  let curStation = currentStation

  while (stationStatusObject[curStation].arrivedFrom !== 'isOrigin') {
    route = route.concat(curStation)
    curStation = stationStatusObject[curStation].arrivedFrom
  }

  route = route.concat(curStation).reverse()

  setRouteTaken(route)
  createLineOptions(route, setLineOptions)
  return route
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
