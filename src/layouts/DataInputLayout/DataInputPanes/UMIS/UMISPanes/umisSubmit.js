import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

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
    let combinedAudit = this.props.audit
    combinedAudit.feature = this.props.feature
    this.props.auditSubmit(combinedAudit)
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
