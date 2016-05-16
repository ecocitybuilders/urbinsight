import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
    let auditHTMLFormatter = function (properties) {
      // Workbook Calculator
      let workbooks = properties.workbooks
      // Demographics Display / Calculator
      let demographics = properties.demographics
      let buildingData = properties.buildingData
      let parcelIdentification = properties.parcelIdentification
      // This should include the user before other things
      let sourceInformation = properties.sourceInformation
    }
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
        }
      })
      // Where to introduce the calculator
      calculateTotals(feature.properties)
      console.log(feature)
      new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
        .setHTML(
          `<div>
           <h3>Water</h3>
            <h4><strong>Toilets:</strong>${feature.properties.totalDemand.water.Toilets}</h4>
            <h4><strong>Hygiene:</strong>${feature.properties.totalDemand.water.Hygiene}</h4>
            <h4><strong>Kitchen:</strong>${feature.properties.totalDemand.water.Kitchen}</h4>
            <h4><strong>Laundry:</strong>${feature.properties.totalDemand.water.Laundry}</h4>
            <h4><strong>Drinking:</strong>${feature.properties.totalDemand.water.Drinking}</h4>
            <h4><strong>Surface Cleaning:</strong>${(feature.properties.totalDemand.water['Surface Cleaning'])}</h4>
            <h4><strong>Evaporative Cooling:</strong>${(feature.properties.totalDemand.water['EvaporativeCooling'])}</h4>
            <h4><strong>Water Customers:</strong>${(feature.properties.totalDemand.water['Water Customers'])}</h4>
          </div>`)
        .addTo(map)
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
