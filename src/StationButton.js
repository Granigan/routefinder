import React from 'react'
import { ToggleButton } from '@material-ui/lab'

const StationButton = (
  station,
  selectStation
) => {


  return (
    <ToggleButton
      key={station}
      selected={false}
      value={station}
      onChange={() => selectStation(station)}
    >
      {station}
    </ToggleButton>
  )
}

export default StationButton
