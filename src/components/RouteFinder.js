import React, { useState } from 'react'
import { Container, Button } from '@material-ui/core/'
import StationButtons from './StationButtons'
import { getStations } from '../dataService'
import { findShortestRoute } from '../dijkstra'

const RouteFinder = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [routeTaken, setRouteTaken] = useState([])
  const [tripDuration, setTripDuration] = useState('')
  const [lineOptions, setLineOptions] = useState('')

  return (
    <Container>
      <div>
        <h1>Esdger-reittihaku</h1>
      </div>
      <Container>
        {StationButtons(
          getStations(),
          origin,
          destination,
          setOrigin,
          setDestination,
          setTripDuration,
          setRouteTaken,
          setLineOptions
        )}
      </Container>
      <div>
        {tripDuration === ''
          ? ''
          : `Nopein reitti on ${routeTaken}, ja kestää ${tripDuration} minuuttia.`}
        {tripDuration > 0 ? `Pysäkkien väleillä kulkevat: ${lineOptions}` : ''}
      </div>
      <div>{`Origin: ${origin} Destination: ${destination}`}</div>
      <Button
        onClick={() =>
          findShortestRoute(
            origin,
            destination,
            setTripDuration,
            setRouteTaken,
            setLineOptions
          )
        }
      >
        Etsi reitti
      </Button>
    </Container>
  )
}

export default RouteFinder
