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
        . Koodikanta{' '}
        <a
          href="https://github.com/Granigan/routefinder"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHubissa
        </a>
        .
      </p>
    </Container>
  )
}

export default RouteFinder
