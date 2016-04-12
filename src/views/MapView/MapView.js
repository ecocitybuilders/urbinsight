import React from 'react'
import ReactDOM from 'react-dom'
// import Dashboard from '../dashboard/Dashboard';
// import DataInput from '../citizen_data/DataInput';
import DataDashboardLayout from 'layouts/DataDashboardLayout/DataDashboardLayout'
const cityObject = {
  cusco: [-71.9675, -13.5320],
  medellin: [-75.5812, 6.2442],
  abudhabi: [54.6973, 24.2992],
  lima: [-77.0428, -12.0464],
  budapest: [19.0402, 47.4979]
}
const cityList = ['cusco', 'medellin', 'abudhabi', 'lima', 'budapest']

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
function cityObjectFunc (city) {
  if (Object.keys(cityObject).indexOf(city) !== -1) {
    return cityObject[city]
  } else {
    return cityObject[cityList[getRandomInt(0, 5)]]
  }
}
// [19.0402, 47.4979]
class MapView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
      mapView: {
        container: 'map',
        style: 'mapbox://styles/thissaysnothing/cijever1v00098xm3zso2fvk7',
        center: cityObjectFunc(window.location.pathname.slice(1)),
        zoom: 15
      }
    }
  }
  render () {
    // style={this.mapStyle}
    if (this.state.map) {
      this.state.map.on('style.load', function () {
        this.state.map.addSource('lots', {
          'type': 'vector',
          'tiles': ['http://localhost:5001/data/city/lots/budapest/{z}/{x}/{y}.mvt']
        })
        this.state.map.addLayer({
          'id': 'lots',
          'type': 'fill',
          'source': 'lots',
          'source-layer': 'parcels',
          'layout': {
            'visibility': 'visible'
          },
          'interactive': true,
          'paint': {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5
          }
        })
      }.bind(this))
      this.state.map.addControl(new mapboxgl.Navigation())
    }
    return (
      <div id='mapContainer'>
        <div id='map'>
          <DataDashboardLayout />
          {/* <DataInputLayout />*/}
        </div>
      </div>
    )
  }
  // <Dashboard />
  componentDidMount () {
    mapboxgl.accessToken = this.state.mapToken
    this.setState({map: new mapboxgl.Map(this.state.mapView)
    })
  }
  componentWillUnmount () {
    this.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }
}

// GLMap.propTypes = {
//     view: React.PropTypes.object,
//     token: React.PropTypes.string
// }

export default MapView
