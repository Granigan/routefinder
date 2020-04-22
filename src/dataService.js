import routes from './data/reittiopas.json'

const stations = routes.pysakit
const roads = routes.tiet
const lines = routes.linjastot

export const getStations = () => stations

export const getAvailableRoutes = () =>
  Array.from(
    new Set(
      Object.keys(lines).reduce(
        (acc, color) => acc.concat(getRoutesForLine(lines[color])),
        []
      )
    )
  )

const getRoutesForLine = (stationsOnOneLine) =>
  stationsOnOneLine.reduce(
    (acc, stop, index) =>
      index < stationsOnOneLine.length - 1
        ? acc.concat([
            stop + stationsOnOneLine[index + 1],
            stationsOnOneLine[index + 1] + stop,
          ])
        : acc,
    []
  )

export const findDuration = (route) =>
  roads
    .filter(
      (road) =>
        (road.mista === route.substring(0, 1) &&
          road.mihin === route.substring(1, 2)) ||
        (road.mihin === route.substring(0, 1) &&
          road.mista === route.substring(1, 2))
    )
    .map((road) => road.kesto)[0]

export const findColour = (route) =>
  Object.keys(lines).reduce((acc, colour) => {
    return getRoutesForLine(lines[colour]).includes(route)
      ? acc.concat([colour])
      : acc
  }, [])

const findNeighbours = (station) =>
  Array.from(
    new Set(
      getAvailableRoutes()
        .filter((route) => route.includes(station))
        .map((route) =>
          route.substring(0, 1) === station
            ? route.substring(1, 2)
            : route.substring(0, 1)
        )
    )
  )

export const getNeighbourList = () =>
  getStations().reduce(
    (acc, station) => ({ ...acc, [station]: findNeighbours(station) }),
    {}
  )

export const getRouteDetails = () =>
  getAvailableRoutes().reduce(
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

export const createLineOptions = (route) =>
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

export default {
  getStations,
  getAvailableRoutes,
  findDuration,
  getNeighbourList,
  getRouteDetails,
  findColour
}
