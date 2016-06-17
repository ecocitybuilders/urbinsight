import React, { PropTypes } from 'react'
import { Button, Well, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import calculateTotals from 'utils/umisUtils'

type Props = {
  nextStep: PropTypes.func,
  prevSection: PropTypes.func,
  audit: PropTypes.object,
  feature: PropTypes.object,
  auditSubmit: PropTypes.func,
  map: PropType.obj
}

class UmisSubmit extends React.Component {
  props: Props;
  constructor () {
    super()
    this.auditSubmit = this.auditSubmit.bind(this)
  }

  // nextStep (e) {
  //   this.props.nextStep()
  // }

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
    calculateTotals(geoJSON)
    this.props.auditSubmit(geoJSON)
    this.props.nextStep()
  }
  render () {
    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Submit Parcel Audit</h3>
        <Well>
          Congratulations! You've reached the end of the parcel audit.
          All that is left to do is to click submit below. If you need to change some data, you can
          also go back to a previous step.
        </Well>
        <br/>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.props.prevSection} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.auditSubmit} block>
              Submit Audit <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UmisSubmit
