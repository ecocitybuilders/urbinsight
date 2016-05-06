import React, { PropTypes } from 'react'
import { Input, Col, Button } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  map: PropTypes.object,
  updateGeoValues: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  formReset: PropTypes.func,
  persistfeatureGeoJSON: PropTypes
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

class UMISParcelLocation extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.updateGeoValues = this.updateGeoValues.bind(this)
    this.previousStep = this.previousStep.bind(this)
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
  updateGeoValues (lat, lon) {
    this.props.updateGeoValues(lat, lon)
  }
  onChange () {
    return
  }

  render () {
    const { lat, lon } = this.props
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
            value={lat || ''}
            onChange={this.onChange}/>
        </Col>
        <Col md={3}>
          <Input type='text' ref='lon'
            label='Longitude'
            placeholder='Enter Longitude'
            value={lon || ''}
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

  cityObj: {
    'lima': 'id_lote',
    'budapest': 'id',
    'cusco': 'id_lote_ca',
    'abudhabi': 'plotid',
    'medellin': 'cobama'
  };
  componentDidMount () {
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
    // this.props.map.on('mousedown', mouseDown, true)
    // how do I make this work for separate instances of cities
    this.props.map.on('click', function (e) {
      let cityObj = {
        'lima': 'id_lote',
        'budapest': 'id',
        'cusco': 'gid',
        'abudhabi': 'plotid',
        'medellin': 'cobama'
      }
      let city = window.location.pathname.slice(1)
      let cityTag = cityObj[city]
      geojson.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
      // this.props.map.getSource('point').setData(geojson)
      var feature = this.props.map.queryRenderedFeatures(e.point, {layers: ['lots']})
      var featureGeoJSON = feature[0]._vectorTileFeature.toGeoJSON()
      if (feature.length) {
        this.props.map.setFilter('lots-hover', ['==', cityTag, feature[0].properties[cityTag]])
      } else {
        this.props.map.setFilter('lots-hover', ['==', cityTag, ''])
      }
      this.updateGeoValues(e.lngLat.lat, e.lngLat.lng)
      this.props.persistfeatureGeoJSON(featureGeoJSON)
    }.bind(this))

  }
  componentWillUnmount () {
    // I should probably do this once the survey submits
    this.props.map.removeLayer('point')
    this.props.map.removeSource('point')
    this.props.map.off('click')
  }
}

export default UMISParcelLocation
