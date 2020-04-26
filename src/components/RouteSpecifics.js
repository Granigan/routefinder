import React from 'react'
import { RouteVisualisation } from './RouteVisualisation'

export const RouteSpecifics = ({ duration, route }) => {
  return !duration ? `Valitse reitti klikkaamalla kohde- ja määränpääasemat.` : (
    <div>
      <h1>{`${duration} min.`}</h1>
      <RouteVisualisation route={route} />
    </div>
  )
}

export default RouteSpecifics
