import React, { PropTypes } from 'react'
import { Button, Input, Col, Row, Well, Checkbox } from 'react-bootstrap'

class UMISWorkbookSelection extends React.Component {
  static propTypes = {
    previousStep: PropTypes.func,
    selectionHandler: PropTypes.func,
    nextSection: PropTypes.func,
    workbookToggle: PropTypes.object
  };
  constructor () {
    super()
    this.nextSection = this.nextSection.bind(this)
  }
  selectionHandler (value, e) {
    this.props.selectionHandler(value)
  }
  nextSection (e) {
    e.preventDefault()
    this.props.nextSection()
  }

  render () {
    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Workbook Selection</h3>
        <Well>
          <h5>Select the workbooks that you would like to complete for this parcel</h5>
        </Well>
        <Checkbox type='checkbox' onChange={() => this.selectionHandler(2)}
          checked={this.props.workbookToggle[2]}>
          Water
        </Checkbox>
        <Checkbox type='checkbox' onChange={() => this.selectionHandler(3)}
          checked={this.props.workbookToggle[3]}>
          Materials
        </Checkbox>
        <Input label='Energy' type='checkbox' disabled='true'/>
        <Input label='Mobility' type='checkbox' disabled='true'/>
        <br />
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.props.previousStep} block>
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

export default UMISWorkbookSelection
