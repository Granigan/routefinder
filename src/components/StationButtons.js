import { useState, useEffect } from 'react'
import StationButton from './StationButton'
import { findShortestRoute } from '../dijkstra'
import { getStations } from '../dataService'

const StationButtons = (
  origin,
  destination,
  setOrigin,
  setDestination,
  setRouteDetails
) => {
  const [toggledButtons, setToggledButtons] = useState(
    initToggles(getStations())
  )

  useEffect(() => {
    if (origin && destination) {
      setRouteDetails(() => findShortestRoute(origin, destination))
    }
  }, [origin, destination])

  const selectStation = (station) => {
    if (toggledButtons[station]) {
      station === origin ? setOrigin(null) : setDestination(null)
      setToggledButtons({ ...toggledButtons, [station]: false })
    } else {
      if (origin === null) {
        setOrigin(station)
        setToggledButtons({ ...toggledButtons, [station]: true })
      } else if (destination === null) {
        setDestination(station)
        setToggledButtons({ ...toggledButtons, [station]: true })
      } else {
        setOrigin(destination)
        setDestination(station)
        setToggledButtons({
          ...initToggles(getStations()),
          [station]: true,
          [destination]: true,
        })
      }
    }
  }

  return getStations().map((station) =>
    StationButton(station, selectStation, toggledButtons)
  )
}

const initToggles = (stations) =>
  stations.reduce((acc, station) => ({ ...acc, [station]: false }), {})

export default StationButtons
