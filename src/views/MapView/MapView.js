import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DataInputLayout from 'layouts/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'layouts/DataDashboardLayout/DataDashboardLayout'
import LayerSelection from 'layouts/LayerSelectionLayout/LayerSelection'
// import UMISPopUp from 'containers/UMISPopUp'
import { connect } from 'react-redux'
import { requestSurveys } from 'redux/modules/survey'
import { requestAudits } from 'redux/modules/audit'
import { cityObjectFunc, surveyGeoJSONCompiler, auditGeoJSONCompiler, boundsArrayGenerator } from 'utils/mapUtils'
import { mapClickHandlerSwitcher } from 'utils/mapUtils'

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  audits: PropTypes.object,
  surveys: PropTypes.object
}

let geojson1 = {
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
    const { isAuthenticated, audits, surveys } = this.props
    return (
      <div id='mapContainer'>
        <div id='map'>
          <LayerSelection />
          <DataDashboardLayout audits={audits} surveys={surveys} />
          {isAuthenticated && <DataInputLayout map={this.state.map} audits={audits}/>}
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
          'circle-radius': 5,
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
          'circle-radius': 5,
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
        'data': geojson1
      })
      map.addLayer({
        'id': 'point',
        'type': 'circle',
        'source': 'point',
        'paint': {
          'circle-radius': 5,
          'circle-color': '#29b381'
        }
      })
      // map.addSource('comunas', {
      //   'type': 'geojson',
      //   'data': 'http://geonode.urbinsight.com/geoserver/wfs?srsName=EPSG%3A4326
      // &typename=medellin%3Acomuna_corrigimiento&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature'
      // })
      //
      // map.addLayer({
      //   'id': 'comunas',
      //   'type': 'fill',
      //   'source': 'comunas',
      //   'paint': {
      //     'fill-color': '#33ff33',
      //     'fill-opacity': 0.5
      //   }
      // })
    })
    // this will essentially be the reducer of the workbooks
    this._map = map
    this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
    this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    map.on('dragend', (e) => {
      this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
      this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    })
    this.setState({map: map})
  }
  componentWillUpdate (np, ns) {
    if (np.audits) mapClickHandlerSwitcher(ns.map, 'featureSelection', {audits: np.audits.audits})
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
