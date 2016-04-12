import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

class UmisWorkbookSelection extends React.Component {
  static propTypes = {
    previousStep: PropTypes.func,
    selectionHandler: PropTypes.func,
    handleNavigation: PropTypes.func
  };
  selectionHandler (value, e) {
    this.props.selectionHandler(value)
  }
  handleNavigation (value) {
    this.props.handleNavigation(value)
  }

  render () {
    return (
      <div>
        <h3>Select which workbooks you would like to complete</h3>
        {/* ng-model='workbookSelection.selectedWorkbooks.water' ng-change='workbookSelection.workbookGenerator()'*/}
        <Input label='Water' type='checkbox' onClick={() => this.selectionHandler('water')}/>
        <Input label='Materials' type='checkbox' onClick={() => this.selectionHandler('materials')}/>
        <Input label='Energy' type='checkbox' disabled='true'/>
        <Input label='Mobility' type='checkbox' disabled='true'/>
        <br />
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.props.previousStep}>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='success' onClick={() => this.handleNavigation('forward')}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisWorkbookSelection
