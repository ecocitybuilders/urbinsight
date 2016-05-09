import React, { PropTypes } from 'react'
import UMISWorkbookSelection from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/umisWorkbookSelection'
import UMISWaterWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/water/waterWorkbook'
import UMISMaterialsWorkbook from 'layouts/DataInputLayout/DataInputPanes/UMIS/WorkbookPanes/materials/materialsWorkbook'
import UMISSubmit from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisSubmit'

type Props = {
  saveValues: PropTypes.func,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  audit: PropTypes.obj
}
class UMISWorkbookContainer extends React.Component {
  props: Props;
  static workbookPanes = {
    1: 'selection',
    2: 'water',
    3: 'materials',
    4: 'submit',
    5: 'complete'
  };

  constructor () {
    super()
    this.state = {
      active: 1,
      workbookToggle: {
        1: true,
        2: false,
        3: false,
        4: true,
        5: true
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
    e.preventDefault()
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
  render () {
    const { audit } = this.props
    switch (this.state.active) {
      case 1:
        return (
          <UMISWorkbookSelection
            previousStep={this.props.previousStep}
            selectionHandler={this.selectionHandler}
            nextSection={this.nextSection}
            workbookToggle={this.state.workbookToggle} />)
      case 2:
        return (
          <UMISWaterWorkbook
            prevSection={this.prevSection}
            nextSection={this.nextSection}
            saveValues={this.props.saveValues}
            audit={audit}
          />
        )
      case 3:
        return (
          <UMISMaterialsWorkbook
            prevSection={this.prevSection}
            nextSection={this.nextSection}
            saveValues={this.props.saveValues}
            audit={audit}
          />
        )
      case 4:
        return (
          <UMISSubmit
            prevSection={this.prevSection}
            nextSection={this.nextSection}
            saveValues={this.props.saveValues}
            audit={audit}
          />
        )
      case 5:
        return (
          <div>successful submit</div>
        )
    }
  }
}

export default UMISWorkbookContainer
