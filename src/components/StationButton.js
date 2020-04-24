import React from 'react'
import { ToggleButton } from '@material-ui/lab'

const StationButton = (station, selectStation, ToggledButtons) => (
  <ToggleButton
    size="large"
    key={station}
    selected={ToggledButtons[station]}
    value={station}
    onChange={() => selectStation(station)}
  >
    {station}
  </ToggleButton>
)

export default StationButton
