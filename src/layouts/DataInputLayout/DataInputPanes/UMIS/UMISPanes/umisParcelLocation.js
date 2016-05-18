import React, { PropTypes } from 'react'
import { Input, Col, Button } from 'react-bootstrap'
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
    mapClickHandlerSwitcher(this.props.map, 'umisLocation',
      {cityTag: this.props.cityTag,
       persistFeatureGeoJSON: this.props.persistFeatureGeoJSON,
       saveValues: this.props.saveValues})
  }
  componentWillReceiveProps (np) {
    if (np.activeInput === 'UMIS' && np.inputOpened) {
      mapClickHandlerSwitcher(np.map, 'umisLocation',
        {cityTag: np.cityTag,
         persistFeatureGeoJSON: np.persistFeatureGeoJSON,
         saveValues: np.saveValues})
    } else if (!np.inputOpened) {
      // switch this.props to np
      mapClickHandlerSwitcher(np.map, 'featureSelection', {audits: this.props.audits.audits})
      // mapClickHandlerSwitcher(this.props.map, 'umisLocation',
      //   {cityTag: this.props.cityTag,
      //    persistFeatureGeoJSON: this.props.persistFeatureGeoJSON,
      //    saveValues: this.props.saveValues})
    }
  }
  componentWillUnmount () {
    mapClickHandlerSwitcher(this.props.map, 'featureSelection', {audits: this.props.audits.audits})
  }
}

export default UMISParcelLocation
