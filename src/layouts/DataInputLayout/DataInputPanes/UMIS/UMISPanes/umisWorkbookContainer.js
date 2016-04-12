import React, { PropTypes } from 'react'
import UmisWorkbookSelection from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/umisWorkbookSelection'
import UmisWaterWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/water/waterWorkbook'
import UmisMaterialsWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/materials/materialsWorkbook'
import UmisSubmit from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisSubmit'

class UMISWorkbookContainer extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func,
    previousStep: PropTypes.func
  };
  constructor () {
    super()
    this.state = {
      available: ['selection', 'water', 'materials', 'submit'],
      active: 1,
      queue: [0, 3],
      pos: 0
    }
  }
  selectionHandler (value, e) {
    let queue = this.state.available
    // Add the workbook selection
    let position = queue.indexOf(value)
    let current = this.state.queue
    if (current.indexOf(position) === -1) {
      current = current.slice(0, (current.length - 1)).concat(position).concat(current.slice((current.length - 1)))
    } else {
      let avail_position = (current.indexOf(position))
      current = current.slice(0, avail_position).concat(current.slice(avail_position + 1))
    }
    this.setState({queue: current})
  }
  handleClick (panel, e) {
    // e.preventDefault();
    this.props.handleClick(panel)
  }
  handleNavigation (nextSection) {
    let currPos = this.state.pos
    let currQueue = this.state.queue
    let newLocation, newActive
    if (nextSection === 'forward') {
      currPos++
      newLocation = currQueue[currPos]
      newActive = this.state.available[newLocation]
    } else if (nextSection === 'back') {
      currPos--
      newLocation = currQueue[currPos]
      newActive = this.state.available[newLocation]
      if (newActive === 'selection') {
        currQueue = [0, 3]
      }
    }
    this.setState({active: newActive,
                   pos: currPos,
                   queue: currQueue})
  }
  render () {
    switch (this.state.active) {
      case 1:
        return (
          <UmisWorkbookSelection
            previousStep={this.props.previousStep}
            handleNavigation={this.handleNavigation.bind(this)}
            selectionHandler={this.selectionHandler.bind(this)} />)
      case 2:
        return (
          <UmisWaterWorkbook
            handleNavigation={this.handleNavigation.bind(this)}/>)
      case 3:
        return (
          <UmisMaterialsWorkbook
            handleNavigation={this.handleNavigation.bind(this)}/>)
      case 4:
        return (
          <UmisSubmit
            handleNavigation={this.handleNavigation.bind(this)}
            handleClick={this.handleClick.bind(this)}/>)
    }
  }
}

export default UMISWorkbookContainer
