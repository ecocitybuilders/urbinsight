import React, { PropTypes } from 'react'
import { Button, Input, Col, Grid } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  map: PropTypes.object,
  updateValues: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number,
  formReset: PropTypes.func
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

class CitizenSurveyLocation extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
    this.updateValues = this.updateValues.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
  previousStep (e) {
    e.preventDefault()
    this.props.formReset()
  }
  nextStep (e) {
    e.preventDefault()
    let data = {
      geoCoordinates: [this.refs.lon.getValue(), this.refs.lat.getValue()]
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  updateValues (lat, lon) {
    this.props.updateValues(lat, lon)
  }
  render () {
    const { lat, lon } = this.props
    return (
      <div>
        <h4 style={{'textAlign': 'center'}}>
          The first step is to input the location associated with the survey.
        </h4>
        <h6 style={{'textAlign': 'center'}}>
          This could be the location the survey was taken or the household of the
          respondent.
        </h6>
        <div>
          <h5>Location data can be entered in one of two ways:</h5>
          <h6 style={{'display': 'inline-block'}}>1. Click the map at the desired location</h6>
          <h6 style={{'display': 'inline-block'}}>2. Enter the Latitude and Longitude</h6>
          <Grid>
            <form style={{'marginBottom': '15px'}}>
              <Col md={3}>
                <Input type='text' ref='lat'
                  label='Latitude'
                  placeholder='Enter Latitude'
                  value={lat || ''}/>
              </Col>
              <Col md={3}>
                <Input type='text' ref='lon'
                  label='Longitude'
                  placeholder='Enter Longitude'
                  value={lon || ''}
                  />
              </Col>
            </form>
          </Grid>
        </div>
        <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '15vw'}}>
          <Button bsStyle='danger' onClick={this.previousStep}>Start Over</Button>
          <Button bsStyle='success' onClick={this.nextStep}>Continue</Button>
        </div>
      </div>
    )
  }

  componentDidMount () {
    // this.props.map.addSource('point', {
    //   'type': 'geojson',
    //   'data': geojson
    // })
    // this.props.map.addLayer({
    //   'id': 'point',
    //   'type': 'circle',
    //   'source': 'point',
    //   'paint': {
    //     'circle-radius': 10,
    //     'circle-color': '#3887be'
    //   }
    // })
    // this.props.map.on('mousedown', mouseDown, true)
    this.props.map.off('click')
    this.props.map.on('click', function (e) {
      geojson.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
      this.props.map.getSource('point').setData(geojson)
      this.updateValues(e.lngLat.lat, e.lngLat.lng)
    }.bind(this))
  }

  componentWillUnmount () {
    // I should probably do this once the survey submits

    this.props.map.off('click')
  }
}

export default CitizenSurveyLocation
