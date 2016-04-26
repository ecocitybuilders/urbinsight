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
  formReset: PropTypes.func,
}

class CitizenSurveyLocation extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
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
  render () {
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
                  defaultValue={this.props.fieldValues.lat}
                  placeholder='Enter Latitude' />
              </Col>
              <Col md={3}>
                <Input type='text' ref='lon'
                  label='Longitude'
                  defaultValue={this.props.fieldValues.lon}
                  placeholder='Enter Longitude' />
              </Col>
            </form>
          </Grid>
        </div>
        <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '15vw'}}>
          <Button bsStyle='danger' onClick={this.props.formReset}>Start Over</Button>
          <Button bsStyle='success' onClick={this.nextStep}>Continue</Button>
        </div>
      </div>
    )
  }
}

export default CitizenSurveyLocation
