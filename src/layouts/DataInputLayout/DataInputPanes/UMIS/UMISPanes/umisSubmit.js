import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import _ from 'lodash'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func,
  audit: PropTypes.object,
  feature: PropTypes.object,
  auditSubmit: PropTypes.func
}

class UmisSubmit extends React.Component {
  props: Props;
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
        <Button bsStyle='info' onClick={this.props.prevSection}>
          <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
        </Button>
        <Button bsStyle='success' onClick={this.auditSubmit}>
          Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
        </Button>
      </div>
    )
  }
}

export default UmisSubmit
