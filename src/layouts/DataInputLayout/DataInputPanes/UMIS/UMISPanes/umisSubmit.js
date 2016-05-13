import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import _ from 'lodash'

class UmisSubmit extends React.Component {
  static propTypes = {
    nextSection: PropTypes.func,
    prevSection: PropTypes.func,
    audit: PropTypes.object,
    feature: PropTypes.object,
    auditSubmit: PropTypes.func
  };
  constructor () {
    super()
    this.nextSection = this.nextSection.bind(this)
    this.auditSubmit = this.auditSubmit.bind(this)
  }
  auditSubmit () {
    // this function builds the geojson from the audit and the feature selected or point if no feature
    let audit = this.props.audit
    let feature = this.props.feature
    let geoJSON
    if (typeof feature !== 'undefined') {
      feature.properties = Object.assign({}, this.props.feature.properties, audit)
      geoJSON = feature
    } else {
      let geoCoordinates = audit.geoCoordinates
      let auditWithoutGeo = _.omit(audit, ['geoCoordinates'])
      // need to remove geoCoordinates from this audit
      geoJSON = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [parseFloat(geoCoordinates[0]), parseFloat(geoCoordinates[1])]
        },
        'properties': auditWithoutGeo
      }
    }
    // console.log('submit geojson')
    // console.log(geoJSON)
    this.props.auditSubmit(geoJSON)
    this.props.nextSection()
  }
  nextSection (e) {
    if (e) e.preventDefault()
    this.props.nextSection()
  }
  render () {
    return (
      <div>
        <h3>Submit Parcel Audit</h3>
        <br />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        {/* <Col sm={6} offset={3}>
          <Button id='submit-button' ng-click='umisSubmit()' type='submit'
          className='btn btn-danger btn-lg btn-block' ui-sref='app.city.pilot.umis.form.endPage'>Submit</Button>

        </Col>*/}
        {/* <Col sm={6}>*/}
        <Button bsStyle='info' onClick={this.props.prevSection}>
          <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
        </Button>
        {/* </Col>*/}
        {/* <Col sm={6}>*/}
        <Button bsStyle='success' onClick={this.auditSubmit}>
          Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
        </Button>
        {/* </Col>*/}
      </div>
    )
  }
}

export default UmisSubmit
