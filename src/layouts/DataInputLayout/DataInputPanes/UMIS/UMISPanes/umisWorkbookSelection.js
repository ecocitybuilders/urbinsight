import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

class UMISWorkbookSelection extends React.Component {
  static propTypes = {
    previousStep: PropTypes.func,
    selectionHandler: PropTypes.func,
    nextSection: PropTypes.func,
    workbookToggle: PropTypes.obj
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
    console.log(this.state)
    return (
      <div>
        <h3>Select which workbooks you would like to complete</h3>
        {/* ng-model='workbookSelection.selectedWorkbooks.water' ng-change='workbookSelection.workbookGenerator()'*/}
        <Input label='Water' type='checkbox' onClick={() => this.selectionHandler(2)}
          checked={this.props.workbookToggle[2]}/>
        <Input label='Materials' type='checkbox' onClick={() => this.selectionHandler(3)}
          checked={this.props.workbookToggle[3]}/>
        <Input label='Energy' type='checkbox' disabled='true'/>
        <Input label='Mobility' type='checkbox' disabled='true'/>
        <br />
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.props.previousStep}>
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
}

export default UMISWorkbookSelection
