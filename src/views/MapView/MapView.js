import React, { PropTypes } from 'react'
import ReactDOM, { render } from 'react-dom'

import DataInputLayout from 'layouts/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'layouts/DataDashboardLayout/DataDashboardLayout'
import { connect } from 'react-redux'
import { requestSurveys } from 'redux/modules/survey'
import { requestAudits } from 'redux/modules/audit'
import { cityObjectFunc, surveyGeoJSONCompiler, auditGeoJSONCompiler, boundsArrayGenerator } from 'utils/mapUtils'
import calculateTotals from 'utils/umisUtils'
// import MapGL from 'react-map-gl'

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  audits: PropTypes.object,
  surveys: PropTypes.object,

}

class TestComponent extends React.Component {
  static propTypes = {
    totalDemand: PropTypes.object
  };
  render () {
    const { totalDemand } = this.props
    return (
      <div>
        <div>
          {/* I could definitely just generate these */}
          <h3>Water</h3>
          <h4><strong>Toilets: </strong>{totalDemand.water.Toilet}</h4>
          <h4><strong>Hygiene: </strong>{totalDemand.water.Hygiene}</h4>
          <h4><strong>Kitchen: </strong>{totalDemand.water.Kitchen}</h4>
          <h4><strong>Laundry: </strong>{(totalDemand.water.Laundry).toFixed(4)}</h4>
          <h4><strong>Drinking: </strong>{totalDemand.water.Drinking}</h4>
          <h4><strong>Surface Cleaning: </strong>{(totalDemand.water['Surface Cleaning'])}</h4>
          <h4><strong>Evaporative Cooling: </strong>{(totalDemand.water['Evaporative Cooling'])}</h4>
          <h4><strong>Water Customers: </strong>{(totalDemand.water['Water Customers'])}</h4>
        </div>
        <div>
          <h3>Materials</h3>
          <h4><strong>Paper: </strong>{totalDemand.materials.Paper}</h4>
          <h4><strong>Organics: </strong>{totalDemand.materials.Organics}</h4>
          <h4><strong>Plastics: </strong>{totalDemand.materials.Plastics}</h4>
          <h4><strong>Textiles: </strong>{totalDemand.materials.Textiles}</h4>
          <h4><strong>Metals: </strong>{totalDemand.materials.Metals}</h4>
          <h4><strong>Glass: </strong>{totalDemand.materials.Glass}</h4>
          <h4><strong>Trimmings: </strong>{totalDemand.materials.Trimmings}</h4>
          <h4><strong>Appliances: </strong>{totalDemand.materials.paper}</h4>
          <h4><strong>Hazardous Waste: </strong>{totalDemand.materials['Hazardous Waste']}</h4>
          <h4><strong>Inerts and Others: </strong>{totalDemand.materials['Inerts and Others']}</h4>
        </div>
      </div>
    )
  }
}

let geojson = {
  'type': 'FeatureCollection',
  'features': [{
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [0, 0]
    }
  }]
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
          'fill-opacity': 0.5,
          'fill-outline-color': '#ffffff'
        }
      })
      map.addSource('auditPolygons', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      })
      map.addLayer({
        'id': 'auditPolygons',
        'type': 'fill',
        'source': 'auditPolygons',
        'layout': {
          'visibility': 'visible'
        },
        'interactive': true,
        'paint': {
          'fill-color': '#e022d9',
          'fill-opacity': 1,
          'fill-outline-color': '#ffffff'
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
      map.addSource('auditPoints', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      })
      map.addLayer({
        'id': 'auditPoints',
        'type': 'circle',
        'source': 'auditPoints',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#e022d9'
        }
      })
      map.addLayer({
        'id': 'lots-hover',
        'type': 'fill',
        'source': 'lots',
        'source-layer': 'parcels',
        'layout': {},
        'paint': {
          'fill-color': '#590303',
          'fill-opacity': 0.5
        },
        'filter': ['==', 'id_lote', '']
      })
      map.addSource('point', {
        'type': 'geojson',
        'data': geojson
      })
      map.addLayer({
        'id': 'point',
        'type': 'circle',
        'source': 'point',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#29b381'
        }
      })
    })
    // this will essentially be the reducer of the workbooks
    this._map = map
    this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
    this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    map.on('dragend', (e) => {
      this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
      this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    })
    map.on('click', (e) => {
      // Array of Audits currently in the state
      let audits = this.props.audits.audits
      let features = map.queryRenderedFeatures(e.point, {layers: ['auditPoints', 'auditPolygons', 'surveys']})
      if (!features.length) return
      let feature = features[0]
      // Need to ignore the fact that the audits are having the id added to their props to maintain state
      // If the feature is found in the current state, which is always should be reassign the feature to be the audit
      audits.forEach(function (audit) {
        if (audit._id === feature.properties.id) {
          feature = audit
          return
        }
      })
      // Where to introduce the calculator
      let div = document.createElement('div')
      // Create an Document Element, then will use render to attach the React Node to it.
      calculateTotals(feature.properties)
      console.log(feature.properties)
      let popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setDOMContent(div)
      render(<TestComponent totalDemand={feature.properties.totalDemand}/>, div, () => {
        popup.addTo(map)
      })
    })
    this.setState({map: map})
  }
  componentWillUpdate (np, ns) {
    surveyGeoJSONCompiler(np.surveys, ns.map)
    auditGeoJSONCompiler(np.audits, ns.map)
  }
  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }
}
// Audits change test
const mapStateToProps = (state) => {
  const { auth, survey, audit } = state
  const { audits } = audit
  const { surveys } = survey
  const { isAuthenticated, errorMessage } = auth
  return {
    isAuthenticated,
    errorMessage,
    surveys,
    audits
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    surveysFetch: (bounds) => {
      dispatch(requestSurveys(bounds))
    },
    auditsFetch: (bounds) => {
      dispatch(requestAudits(bounds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
