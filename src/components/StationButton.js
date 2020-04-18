import React from 'react'
import { ToggleButton } from '@material-ui/lab'

const StationButton = (station, selectStation, ToggledButtons) => {
  return (
    <ToggleButton
      key={station}
      selected={ToggledButtons[station]}
      value={station}
      onChange={() => selectStation(station)}
    >
      {station}
    </ToggleButton>
  )
}

export default StationButton
