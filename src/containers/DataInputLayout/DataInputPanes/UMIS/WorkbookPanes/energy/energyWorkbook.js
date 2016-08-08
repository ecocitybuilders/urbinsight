import React, { PropTypes } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import EnergyDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func.isRequired,
  prevSection: Proptypes.func,
  saveValues: PropTypes.func
}


class UMISEnergyWorkbook extends React.Component {
  props: Props;
  constructor () {
    super();
  }

  nexSection(e) {
    e.preventDefault()

    // TODO: save the data from the form
    let data = {}
    this.props.nextSection()
  }

  render () {

    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Energy Workbook</h3>
        <Row>
        <Col xs={6} sm={6} md={6}>
          <Button bsStyle='info' onClick={this.props.prevSection} block>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col xs={6} sm={6} md={6} >
          <Button bsStyle='success' onClick={this.nextSection} block>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
        </Row>
      </div>
    )
  }
}

export default UMISEnergyWorkbook
