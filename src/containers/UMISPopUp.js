import React, { PropTypes } from 'react'
import WaterWorkbookPopUp from 'components/WaterWorkbookPopUp'
import MaterialsWorkbookPopUp from 'components/MaterialsWorkbookPopUp'
class UMISPopUp extends React.Component {
  static propTypes = {
    totalDemand: PropTypes.object
  };
  constructor (props) {
    super(props)
    this.state = {
      active: 1
    }
    // const { totalDemand } = props
    // dataArray = []
    // for (var key in totalDemand.water) {
    //   if (totalDemand.water.hasOwnProperty(key)) {
    //     dataArray.push([key, totalDemand.water[key]])
    //   }
    // }
    // chartData = {
    //   bindto: '#waterPopUpChart',
    //   data: {
    //     columns: dataArray,
    //     type: 'pie'
    //   },
    //   size: {
    //     width: 200,
    //     height: 200
    //   }
    // }
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
    switch (this.state.active) {
      case 1:
        return (<div>
          <div style={{height: 100}} id='waterPopUpChart'></div>
          <WaterWorkbookPopUp nextStep={this.nextStep} totalDemand={totalDemand} />
        </div>)
      case 2:
        return <MaterialsWorkbookPopUp previousStep={this.previousStep} totalDemand={totalDemand} />
    }
  }

}

export default UMISPopUp
