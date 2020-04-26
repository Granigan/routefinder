import React from 'react'
import { RouteVisualisation } from './RouteVisualisation'
import { Container, IconButton } from '@material-ui/core'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'

export const RouteSpecifics = ({ duration, route, reverseRoute }) => {
  return !duration ? (
    <p>Valitse reitti klikkaamalla kohde- ja määränpääasemat.</p>
  ) : (
    <Container>
      <div>
        <h1>
          {`${route[0]} -> ${route[route.length - 1]}: ${duration} min.`}
          <IconButton onClick={() => reverseRoute()}>
            <SwapHorizIcon fontSize="large" />
          </IconButton>
        </h1>
      </div>
      <RouteVisualisation route={route} />
    </Container>
  )
}

export default RouteSpecifics
