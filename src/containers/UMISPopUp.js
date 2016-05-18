import React, { PropTypes } from 'react'
import WaterWorkbookPopUp from 'components/WaterWorkbookPopUp'
import MaterialsWorkbookPopUp from 'components/MaterialsWorkbookPopUp'

class UMISPopUp extends React.Component {
  static propTypes = {
    totalDemand: PropTypes.object
  };
  constructor () {
    super()
    this.state = {
      active: 1
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
  }
  nextStep () {
    this.setState({
      active: this.state.active + 1
    })
  }
  previousStep () {
    this.setState({
      active: this.state.active - 1
    })
  }
  render () {
    const { totalDemand } = this.props
    console.log(totalDemand)
    switch (this.state.active) {
      case 1:
        return <WaterWorkbookPopUp nextStep={this.nextStep} totalDemand={totalDemand} />
      case 2:
        return <MaterialsWorkbookPopUp previousStep={this.previousStep} totalDemand={totalDemand} />
    }
  }
}

export default UMISPopUp
