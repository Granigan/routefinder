import React, { useState } from 'react'
import { Container } from '@material-ui/core/'
import StationButtons from './StationButtons'


const RouteFinder = () => {
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [routeDetails, setRouteDetails] = useState({})

  return (
    <Container>
      <div>
        <h1>Esdger-reittihaku</h1>
      </div>
      <Container>
        {StationButtons(
          origin,
          destination,
          setOrigin,
          setDestination,
          setRouteDetails
        )}
      </Container>
      <p>
        {routeDetails.duration
          ? `Matka-aika: ${routeDetails.duration}, nopein reitti: ${routeDetails.route}`
          : ''}
      </p>
    </Container>
  )
}

export default RouteFinder
