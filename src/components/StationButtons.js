import { useState } from 'react'
import StationButton from './StationButton'

const StationButtons = (
  stations,
  origin,
  destination,
  setOrigin,
  setDestination
) => {
  const [ToggledButtons, setToggledButtons] = useState(initToggles(stations))

  const selectStation = (station) => {
    if (ToggledButtons[station]) {
      station === origin ? setOrigin('') : setDestination('')
      setToggledButtons({ ...ToggledButtons, [station]: false})
    } else {
      console.log(`${station} not checked`, ToggledButtons)
      if (origin === '') {
        setOrigin(station)
        setToggledButtons({ ...ToggledButtons, [station]: true })
      } else if (destination === '') {
        setDestination(station)
        setToggledButtons({ ...ToggledButtons, [station]: true })
      } else {
        setOrigin(destination)
        setDestination(station)
        setToggledButtons({
          ...initToggles(stations),
          [station]: true,
          [destination]: true,
        })
      }
    }
  }

  return stations.map((station) =>
    StationButton(station, selectStation, ToggledButtons)
  )
}

const initToggles = (stations) =>
  stations.reduce((acc, station) => ({ ...acc, [station]: false }), {})

export default StationButtons
