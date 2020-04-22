import React from 'react'
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus'
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import { green, yellow, red, blue } from '@material-ui/core/colors'
import { findColour } from '../dataService'

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

const createLineOptions = (route) => {
  return
}

export const RouteSpecifics = ({ duration, route }) => {
  if (!duration > 0) return null
  const stationToStationRoutes = route.reduce(
    (acc, station, index) =>
      index < route.length - 1 ? acc.concat([station + route[index + 1]]) : acc,
    []
  )
  console.log(stationToStationRoutes)

  const visualisation = stationToStationRoutes.map((stationToStationRoute, index) => (
    <div>
      {`${stationToStationRoute.substring(0, 1)}`}
      <SyncAltIcon size="small" value={stationToStationRoute}/>
      {`${stationToStationRoute.substring(1, 2)}` + ':'}{' '}
      {LineIcon(findColour(stationToStationRoute)[0], route + index)}
    </div>
  ))

  return duration > 0 ? <div>{visualisation}</div> : null
}

export default RouteSpecifics
