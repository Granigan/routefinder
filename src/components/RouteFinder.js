import React, { useState } from 'react'
import { Container } from '@material-ui/core/'
import StationButtons from './StationButtons'
import { getStations } from '../dataService'

const RouteFinder = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [routeDetails, setRouteDetails] = useState({})

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
          setRouteDetails
        )}
      </Container>
      <p>
        {routeDetails.duration
          ? `Duration: ${routeDetails.duration}, quickest route: ${routeDetails.route}`
          : ''}
      </p>
    </Container>
  )
}

export default RouteFinder
