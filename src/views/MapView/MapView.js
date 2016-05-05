import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DataInputLayout from 'layouts/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'layouts/DataDashboardLayout/DataDashboardLayout'
import { connect } from 'react-redux'
import { requestSurveys } from 'redux/modules/survey'
import { cityObjectFunc, geoJSONCompiler, boundsArrayGenerator } from 'utils/mapUtils'
// import MapGL from 'react-map-gl'

type Props = {
  isAuthenticated: PropTypes.bool,
  fetchSurveys: PropTypes.func,
  surveys: PropTypes.object
}

class MapView extends React.Component {
  props: Props;
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
    const { isAuthenticated } = this.props
    return (
      <div id='mapContainer'>
        <div id='map'>
          <DataDashboardLayout />
          {isAuthenticated && <DataInputLayout map={this.state.map}/>}
        </div>
      </div>
    )
  }
  // <Dashboard />
  componentDidMount () {
    let city = window.location.pathname.slice(1)
    let tileLocation = 'http://localhost:5001/data/city/lots/' + city + '/{z}/{x}/{y}.mvt'
    mapboxgl.accessToken = this.state.mapToken
    var map = new mapboxgl.Map(this.state.mapView)
    map.addControl(new mapboxgl.Navigation())
    map.on('style.load', function () {
      map.addSource('lots', {
        'type': 'vector',
        'tiles': [tileLocation]
      })
      map.addLayer({
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
      map.addSource('surveys', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      })
      map.addLayer({
        'id': 'surveys',
        'type': 'circle',
        'source': 'surveys',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#ec9918'
        }
      })
    })
    // this._map = map
    this.props.fetchSurveys(boundsArrayGenerator(map.getBounds()))
    map.on('dragend', (e) => {
      this.props.fetchSurveys(boundsArrayGenerator(map.getBounds()))
    })
    this.setState({map: map})
  }
  componentWillUpdate (np, ns) {
    geoJSONCompiler(np.surveys, ns.map)
  }
  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }
}

const mapStateToProps = (state) => {
  const { auth, survey } = state
  const { surveys } = survey
  const { isAuthenticated, errorMessage } = auth
  return {
    isAuthenticated,
    errorMessage,
    surveys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSurveys: (bounds) => {
      dispatch(requestSurveys(bounds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
