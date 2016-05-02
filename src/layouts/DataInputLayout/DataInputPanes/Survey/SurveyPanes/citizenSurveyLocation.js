import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Grid } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  fieldValues: PropTYpes.object,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  map: PropTypes.object,
  updateValues: PropTypes.func,
  lat: PropTypes.number,
  lon: PropTypes.number
}

class CitizenSurveyLocation extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
    this.updateValues = this.updateValues.bind(this)
    // this.state = {}
  }
  nextStep (e) {
    e.preventDefault()
    // There has to be an easier way to do this
    let data = {
      lat: ReactDOM.findDOMNode(this.refs.lat).children[1].value,
      lon: ReactDOM.findDOMNode(this.refs.lon).children[1].value
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
          <Button bsStyle='danger' onClick={this.props.previousStep}>Start Over</Button>
          <Button bsStyle='success' onClick={this.nextStep}>Continue</Button>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.props.map.on('click', function (e) {
      this.updateValues(e.lngLat.lat, e.lngLat.lng)
    }.bind(this))
  }
}

export default CitizenSurveyLocation
