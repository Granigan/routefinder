import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import { findColour } from '../dataService'
import React from 'react'

const createLineOptions = (route) =>
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

export const RouteSpecifics = ({ duration, route }) =>
  duration > 0 ? (
    <div>{`${duration} min. ${createLineOptions(route)}`}</div>
  ) : null

export default RouteSpecifics
