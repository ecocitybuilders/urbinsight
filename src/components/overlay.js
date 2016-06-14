import React from 'react'
import ExampleOverlay from 'static/scripts/react-map-gl-example-overlay/src/overlay.react'
import cities from 'example-cities'


const Overlay = (props) => <div>
  <ExampleOverlay {...props} locations={cities} />
</div>

export default Overlay
