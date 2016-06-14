import React from 'react'
import ExampleOverlay from '../../react-map-gl-example-overlay/src/overlay'
import cities from 'example-cities'

const Overlay = (props) => <div>
  <ExampleOverlay {...props} locations={cities} />
</div>

export default Overlay
