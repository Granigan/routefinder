import StationButton from './StationButton'

const StationButtons = (stations, origin, destination, setOrigin, setDestination) => {

    const selectStation = (station) => {
      if (origin === '') {
        setOrigin(station)
      } else if (destination === '') {
        setDestination(station)
      } else {
        setOrigin(destination)
        setDestination(station)
      }
    }
  
    return stations.map((station) => StationButton(station, selectStation))
  }
  
  export default StationButtons