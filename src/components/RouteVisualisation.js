import React from 'react'
import LegDetails from './LegDetails'

export const RouteVisualisation = ({ route }) => {
  const stationToStationRoutes = route.reduce(
    (acc, station, index) =>
      index < route.length - 1 ? acc.concat([station + route[index + 1]]) : acc,
    []
  )
  return stationToStationRoutes.map((stationToStationRoute) => (
    <LegDetails
      stationToStationRoute={stationToStationRoute}
      key={stationToStationRoute}
    />
  ))
}

export default RouteVisualisation
