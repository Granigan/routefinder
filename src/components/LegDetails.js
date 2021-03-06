import React from 'react'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { TableCell, TableRow } from '@material-ui/core'
import { green, yellow, red, blue } from '@material-ui/core/colors'
import { findColour, findDuration } from '../dataService'

const getLineIcon = (line, key) => {
  const colorTranslation = {
    keltainen: yellow[500],
    punainen: red[500],
    sininen: blue[500],
    vihreä: green[500],
  }

  return (
    <DirectionsBusIcon key={key} style={{ color: colorTranslation[line] }} />
  )
}

export const LegDetails = ({ stationToStationRoute }) => {
  const originStation = stationToStationRoute.substring(0, 1)
  const destinationStation = stationToStationRoute.substring(1, 2)
  const lineIcon = findColour(stationToStationRoute).map((lineOnRoute) =>
    getLineIcon(lineOnRoute, stationToStationRoute + lineOnRoute)
  )
  const duration = findDuration(stationToStationRoute)

  return (
    <TableRow>
      <TableCell>{originStation}</TableCell>
      <TableCell>
        <ArrowForwardIcon fontSize="small" align="middle" />
      </TableCell>
      <TableCell>{destinationStation}</TableCell>
      <TableCell>{lineIcon}</TableCell>
      <TableCell>{` ${duration} min.`}</TableCell>
    </TableRow>
  )
}

export default LegDetails
