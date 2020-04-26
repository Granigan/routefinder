import React, { useState } from 'react'
import { Container } from '@material-ui/core/'
import StationButtons from './StationButtons'
import RouteSpecifics from './RouteSpecifics'

const RouteFinder = () => {
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)
  const [routeDetails, setRouteDetails] = useState({})

  const reverseRoute = () => {
    const newDestination = origin
    setOrigin(destination)
    setDestination(newDestination)
  }

  return (
    <Container>
      <div>
        <h1>Edsger-setä opastaa!</h1>
        <p>
          Vastaus{' '}
          <a
            href="https://koodihaaste.solidabis.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Solidabis-koodihaasteeseen
          </a>
          .
        </p>
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
      <RouteSpecifics
        duration={routeDetails.duration}
        route={routeDetails.route}
        reverseRoute={reverseRoute}
      />
    </Container>
  )
}

export default RouteFinder
