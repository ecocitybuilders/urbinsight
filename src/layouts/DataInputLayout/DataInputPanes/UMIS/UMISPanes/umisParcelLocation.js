import React, { PropTypes } from 'react'
import { Input, Col, Button } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  map: PropTypes.object,
  formReset: PropTypes.func,
  persistFeatureGeoJSON: PropTypes.func,
  audit: PropTypes.obj
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
let cityObj = {
  'lima': 'id_lote',
  'budapest': 'id',
  'cusco': 'gid',
  'abudhabi': 'plotid',
  'medellin': 'cobama'
}

class UMISParcelLocation extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
    // this is for the selection of a parcel that doesn't exist
    // could be refactored to be drawings when approriate
    this.props.map.addSource('point', {
      'type': 'geojson',
      'data': geojson
    })
    this.props.map.addLayer({
      'id': 'point',
      'type': 'circle',
      'source': 'point',
      'paint': {
        'circle-radius': 10,
        'circle-color': '#29b381'
      }
    })
  }
  previousStep (e) {
    e.preventDefault()
    this.props.formReset()
  }
  nextStep (e) {
    // e.preventDefault()
    let data = {
      geoCoordinates: [this.refs.lon.getValue(), this.refs.lat.getValue()]
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }

  // This is here to satisfy the warning
  onChange (e) {
    let data = {
      geoCoordinates: [this.refs.lon.getValue(), this.refs.lat.getValue()]
    }
    this.props.saveValues(data)
  }

  render () {
    const { audit } = this.props
    return (
      <div>
        <h3>Select Parcel to Audit on the Map</h3>
        <h5>To begin a parcel audit click the map to place a marker on the map where the data is derived from</h5>
        <h5>
          The marker can be moved by simply clicking the map again, the marker location will be
           updated automatically and assigned to the data
        </h5>
        <br />
        <Col md={3}>
          <Input type='text' ref='lat'
            label='Latitude'
            placeholder='Enter Latitude'
            value={audit && audit.geoCoordinates ? audit.geoCoordinates[1] : ''}
            onChange={this.onChange}
            />
        </Col>
        <Col md={3}>
          <Input type='text' ref='lon'
            label='Longitude'
            placeholder='Enter Longitude'
            value={audit && audit.geoCoordinates ? audit.geoCoordinates[0] : ''}
            onChange={this.onChange}
            />
        </Col>
        <br />
        <br />
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.previousStep}>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='success' onClick={this.nextStep}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
      </div>
    )
  }

  componentDidMount () {
    // this.props.map.on('mousedown', mouseDown, true)
    this.props.map.on('click', function (e) {
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
      // FIX This is to be able to on the fly dictate what unique id to use for parcel selection
      let city = window.location.pathname.slice(1)
      let cityTag = cityObj[city]
      let feature = this.props.map.queryRenderedFeatures(e.point, {layers: ['lots']})
      if (feature.length) {
        if (typeof this.props.map.getSource('point') !== 'undefined') {
          this.props.map.getSource('point').setData(geojson)
        }
        this.props.map.setFilter('lots-hover', ['==', cityTag, feature[0].properties[cityTag]])
        let featureGeoJSON = feature[0]._vectorTileFeature.toGeoJSON()
        // I should probably only persist the feature on save instead of here
        this.props.persistFeatureGeoJSON(featureGeoJSON)
      } else {
        this.props.map.setFilter('lots-hover', ['==', cityTag, ''])
        geojson.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
        this.props.map.getSource('point').setData(geojson)
      }
      this.props.saveValues({geoCoordinates: [e.lngLat.lat, e.lngLat.lng]})
    }.bind(this))
  }
  componentWillUnmount () {
    this.props.map.off('click')
  }
}

export default UMISParcelLocation
