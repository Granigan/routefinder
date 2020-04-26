import React from 'react'
import LegDetails from './LegDetails'
import { TableContainer, Table, TableBody } from '@material-ui/core'

export const RouteVisualisation = ({ route }) => {
  const stationToStationRoutes = route.reduce(
    (acc, station, index) =>
      index < route.length - 1 ? acc.concat([station + route[index + 1]]) : acc,
    []
  )
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {stationToStationRoutes.map((stationToStationRoute) => (
            <LegDetails
              stationToStationRoute={stationToStationRoute}
              key={stationToStationRoute}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RouteVisualisation
