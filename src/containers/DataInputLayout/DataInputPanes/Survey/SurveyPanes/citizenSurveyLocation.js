import React, { PropTypes } from 'react'
import { Input, Button, Col, Row, Well, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  formReset: PropTypes.func,
  survey: PropTypes.object,
  mapClickHandler: PropTypes.func
}

class CitizenSurveyLocation extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  previousStep (e) {
    e.preventDefault()
    this.props.formReset()
  }
  nextStep (e) {
    this.onChange()
    this.props.nextStep()
  }
  onChange (e) {
    let data = {
      // geoCoordinates: [this.refs.lon.props.value, this.refs.lat.props.value]
      geoCoordinates: [this.refs.lon.getValue(), this.refs.lat.getValue()]
    }
    this.props.saveValues(data)
  }

  render () {
    const { survey } = this.props
    return (
      <div className='survey-data'>
        <h3>Citizen Survey - Survey Location</h3>
        <Well>
          <h5>
            Begin a Citizen Survey by clicking the map to select a location.
          </h5>
          <h5>
            This could be the location the survey was taken, or the household location of the respondent.
            Additionally, the Latitude and Longitude can be entered directly if known.
          </h5>
        </Well>
        <br />
        <Row>
          <Col md={6}>
            {/*<FormGroup controlId='lat'>
              <ControlLabel>Latitude</ControlLabel>
              <FormControl
                ref='lat'
                type='number'
                value={survey && survey.geoCoordinates ? survey.geoCoordinates[1] : ''}
                step='.00001'
                placeholder='Enter Latitude'
                onChange={this.onChange}
              />
            </FormGroup>*/}
            <Input type='text' ref='lat'
              label='Latitude'
              placeholder='Enter Latitude'
              value={survey && survey.geoCoordinates ? survey.geoCoordinates[1] : ''}
              onChange={this.onChange}
              />
          </Col>
          <Col md={6}>
            {/*<FormGroup controlId='lon'>
              <ControlLabel>Longitude</ControlLabel>
              <FormControl
                ref='lon'
                type='number'
                value={survey && survey.geoCoordinates ? survey.geoCoordinates[0] : ''}
                step='.00001'
                placeholder='Enter Longitude'
                onChange={this.onChange}
              />
            </FormGroup>*/}
            <Input type='text' ref='lon'
              label='Longitude'
              placeholder='Enter Longitude'
              value={survey && survey.geoCoordinates ? survey.geoCoordinates[0] : ''}
              onChange={this.onChange}
              />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.previousStep} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Start Over
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.nextStep} block>
              Continue <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount () {
    console.log('im the survey location did mount')
    this.props.mapClickHandler('surveyLocation', {saveValues: this.props.saveValues})
  }
  componentWillReceiveProps (np) {
    console.log('im the survey location will receive props')
    if (np.activeInput === 'Survey' && np.inputOpened) {
      this.props.mapClickHandler('surveyLocation', {saveValues: this.props.saveValues})
    } else if (!np.inputOpened) {
      if (typeof np.map.getLayer('point') !== 'undefined') np.map.removeLayer('point')
      this.props.mapClickHandler('featureSelection')
    }
  }
  componentWillUnmount () {
    this.props.mapClickHandler('featureSelection')
  }
}

export default CitizenSurveyLocation
