import React, { PropTypes } from 'react'
import _ from 'lodash'
import ExampleOverlay from 'static/scripts/react-map-gl-example-overlay/src/overlay.react'
import cities from 'example-cities'

type Props = {
  map: PropTypes.obj
}

class Overlay extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        isDragging: false
      }
    }
  }
  componentWillReceiveProps (np) {
    const { map } = np
    map.off('render')
    map.on('render', (e) => {
      let newViewport = {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
        zoom: map.getZoom(),
        width: map.transform.width,
        height: map.transform.height,
        isDragging: false
      }
      if (!(_.isEqual(newViewport, this.state.viewport))) { this.setState({ viewport: newViewport }) }
    })
  }

  render () {
    return (
      <div>
        <ExampleOverlay {...this.state.viewport} locations={cities} />
      </div>
    )
  }
}

export default Overlay
