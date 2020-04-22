import React from 'react'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { green, yellow, red, blue } from '@material-ui/core/colors'
import { findColour, findDuration } from '../dataService'

const LineIcon = (line, key) => {
  switch (line) {
    case 'keltainen':
      return <DirectionsBusIcon key={key} style={{ color: yellow[500] }} />
    case 'punainen':
      return <DirectionsBusIcon key={key} style={{ color: red[500] }} />
    case 'sininen':
      return <DirectionsBusIcon key={key} style={{ color: blue[500] }} />
    case 'vihreä':
      return <DirectionsBusIcon key={key} style={{ color: green[500] }} />
    default:
      return null
  }
}

export const RouteVisualisation = ({ route }) => {
  const stationToStationRoutes = route.reduce(
    (acc, station, index) =>
      index < route.length - 1 ? acc.concat([station + route[index + 1]]) : acc,
    []
  )

  return stationToStationRoutes.map((stationToStationRoute, index) => (
    <div key={index}>
      {`${stationToStationRoute.substring(0, 1)}`}
      <ArrowForwardIcon fontSize="small" key={stationToStationRoute + index} />
      {`${stationToStationRoute.substring(1, 2)}: `}
      {findColour(stationToStationRoute).map((lineOnRoute) =>
        LineIcon(lineOnRoute, stationToStationRoute + lineOnRoute)
      )}
      {`${findDuration(stationToStationRoute)} min.`}
    </div>
  ))
}

export default RouteVisualisation
