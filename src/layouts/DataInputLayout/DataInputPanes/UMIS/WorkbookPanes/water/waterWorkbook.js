import React, { PropTypes } from 'react'
import { Button, Col } from 'react-bootstrap'
import LandcoverPreCalc from './LandcoverPreCalc'
import WaterDemandJunctions from './DemandJunctions'

class UMISWaterWorkbook extends React.Component {
  static propTypes = {
    nextSection: PropTypes.func,
    prevSection: PropTypes.func
  };
  constructor () {
    super()
    this.nextSection = this.nextSection.bind(this)
  }
  nextSection (e) {
    e.preventDefault()
    this.props.nextSection()
  }
  render () {
    console.log(this.props)

    return (
      <div>
        <h3>Water Workbook</h3>
        <LandcoverPreCalc ref='landCoverPreCalc'/>
        <WaterDemandJunctions ref='demandJunctions'/>
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.props.prevSection}>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='success' onClick={this.nextSection}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
      </div>
    )
  }
  componentDidMount () {}
}

export default UMISWaterWorkbook
