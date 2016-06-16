import React, { PropTypes } from 'react'
import { Input, Col, Row, Button, Well, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { mapClickHandlerSwitcher } from 'utils/mapUtils'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  map: PropTypes.object,
  formReset: PropTypes.func,
  persistFeatureGeoJSON: PropTypes.func,
  audit: PropTypes.obj,
  cityTag: PropTypes.string,
  audits: PropTypes.object
}

class UMISParcelLocation extends React.Component {
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
      <div className='umis-data umis-data-location'>
        <h3 className='umis-data-title'>UMIS Form - Parcel Location</h3>
        <Well>
          <h5>Begin a Parcel Audit by clicking the map to select a location.</h5>
          <h5>
            If the parcel exists on the parcel map it will highlight.
            Otherwise a point will be placed on the map.
          </h5>
        </Well>
        <br />
        <Row>
          {/*<FormGroup controlId='lat'>
            <ControlLabel>Latitude</ControlLabel>
            <FormControl
              ref='lat'
              type='number'
              value={audit && audit.geoCoordinates ? audit.geoCoordinates[1] : ''}
              step='.00001'
              placeholder='Enter Latitude'
              onChange={this.onChange}
              />
          </FormGroup>*/}
          <Col md={6}>
            <Input type='text' ref='lat'
              label='Latitude'
              placeholder='Enter Latitude'
              value={audit && audit.geoCoordinates ? audit.geoCoordinates[1] : ''}
              onChange={this.onChange}
              />
          </Col>
          <Col md={6}>
            {/*<FormGroup controlId='lon'>
              <ControlLabel>Longitude</ControlLabel>
              <FormControl
                ref='lon'
                type='number'
                value={audit && audit.geoCoordinates ? audit.geoCoordinates[0] : ''}
                step='.00001'
                placeholder='Enter Longitude'
                onChange={this.onChange}
                />
            </FormGroup>*/}
            <Input type='text' ref='lon'
              label='Longitude'
              placeholder='Enter Longitude'
              value={audit && audit.geoCoordinates ? audit.geoCoordinates[0] : ''}
              onChange={this.onChange}
              />
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.previousStep} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.nextStep} block>
              Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount () {
    console.log('im umis parcel location did mount')
    mapClickHandlerSwitcher(this.props.map, 'umisLocation',
      {cityTag: this.props.cityTag,
       persistFeatureGeoJSON: this.props.persistFeatureGeoJSON,
       saveValues: this.props.saveValues})
  }
  componentWillReceiveProps (np) {
    console.log('im umis parcel location will receive props')
    if (np.activeInput === 'UMIS' && np.inputOpened) {
      mapClickHandlerSwitcher(np.map, 'umisLocation',
        {cityTag: np.cityTag,
         persistFeatureGeoJSON: np.persistFeatureGeoJSON,
         saveValues: np.saveValues})
    } else if (!np.inputOpened) {
      if (typeof np.map.getLayer('point') !== 'undefined') np.map.removeLayer('point')
      mapClickHandlerSwitcher(np.map, 'featureSelection', {audits: this.props.audits})
    }
  }
  componentWillUnmount () {
    let audits = this.props.audits ? this.props.audits : {}
    mapClickHandlerSwitcher(this.props.map, 'featureSelection', {audits: audits})
  }
}

export default UMISParcelLocation
