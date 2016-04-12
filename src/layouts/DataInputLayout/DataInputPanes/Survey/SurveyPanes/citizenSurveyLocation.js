import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Grid } from 'react-bootstrap'

class CitizenSurveyLocation extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired
  };
  handleClick (panel, e) {
    e.preventDefault()
    this.props.handleClick(panel)
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
                <Input type='text' label='Latitude' placeholder='Enter Latitude' />
              </Col>
              <Col md={3}>
                <Input type='text' label='Longitude' placeholder='Enter Longitude' />
              </Col>
            </form>
          </Grid>
        </div>
        <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '15vw'}}>
          <Button bsStyle='danger' onClick={this.handleClick.bind(this, 'INTRO')}>Start Over</Button>
          <Button bsStyle='success' onClick={this.handleClick.bind(this, 'FORM')}>Continue</Button>
        </div>
      </div>
    )
  }
}

export default CitizenSurveyLocation
