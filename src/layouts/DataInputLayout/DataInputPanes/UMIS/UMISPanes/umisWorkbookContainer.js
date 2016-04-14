import React, { PropTypes } from 'react'
import UMISWorkbookSelection from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/umisWorkbookSelection'
import UMISWaterWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/water/waterWorkbook'
import UMISMaterialsWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/materials/materialsWorkbook'
import UMISSubmit from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisSubmit'

class UMISWorkbookContainer extends React.Component {
  static propTypes = {
    nextStep: PropTypes.func,
    previousStep: PropTypes.func
  };
  static workbookPanes = {
    0: 'selection',
    1: 'water',
    2: 'materials',
    3: 'submit'
  };

  constructor () {
    super()
    this.state = {
      active: 1,
      workbookToggle: {
        1: true,
        2: false,
        3: false,
        4: true
      }
    }
    this.nextStep = this.nextStep.bind(this)
    this.selectionHandler = this.selectionHandler.bind(this)
    this.nextSection = this.nextSection.bind(this)
    this.prevSection = this.prevSection.bind(this)
  }
  selectionHandler (value) {
    let workbookToggle = this.state.workbookToggle
    workbookToggle[value] = !workbookToggle[value]

    this.setState({
      workbookToggle: workbookToggle
    })
  }
  nextStep (e) {
    // e.preventDefault()
    this.props.nextStep(e)
  }
  nextSection () {
    let active = this.state.active + 1
    while (!this.state.workbookToggle[active]) {
      active++
    }
    this.setState({
      active: active
    })
  }
  prevSection () {
    let active = this.state.active - 1
    while (!this.state.workbookToggle[active]) {
      active--
    }
    this.setState({
      active: active
    })
  }
  // handleNavigation (nextSection) {
  //   let currPos = this.state.pos
  //   let currQueue = this.state.queue
  //   let newLocation, newActive
  //   if (nextSection === 'forward') {
  //     currPos++
  //     newLocation = currQueue[currPos]
  //     newActive = this.state.available[newLocation]
  //   } else if (nextSection === 'back') {
  //     currPos--
  //     newLocation = currQueue[currPos]
  //     newActive = this.state.available[newLocation]
  //     if (newActive === 'selection') {
  //       currQueue = [0, 3]
  //     }
  //   }
  //   this.setState({active: newActive,
  //                  pos: currPos,
  //                  queue: currQueue})
  // }
  render () {
    switch (this.state.active) {
      case 1:
        return (
          <UMISWorkbookSelection
            previousStep={this.props.previousStep}
            selectionHandler={this.selectionHandler}
            nextSection={this.nextSection} />)
      case 2:
        return (
          <UMISWaterWorkbook
            prevSection={this.prevSection}
            nextSection={this.nextSection}
          />
        )
      case 3:
        return (
          <UMISMaterialsWorkbook
            prevSection={this.prevSection}
            nextSection={this.nextSection}
          />
        )
      case 4:
        return (
          <UMISSubmit
            prevSection={this.prevSection}
            nextSection={this.nextSection}
            nextStep={this.nextStep}
          />
        )
    }
  }
}

export default UMISWorkbookContainer
