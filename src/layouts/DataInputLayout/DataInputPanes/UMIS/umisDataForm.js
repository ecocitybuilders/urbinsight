import React from 'react'
import UMISIntro from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDataIntro'
import UMISParcelLocation from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisParcelLocation'
import UMISSourceInformation from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisSourceInformation'
import UMISDescribeParcel from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDescribeParcel'
import UMISBuildingData from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisBuildingData'
import UMISDemographics from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisDemographics'
import UMISWorkbookContainer from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisWorkbookContainer'
import UMISComplete from 'layouts/DataInputLayout/DataInputPanes/UMIS/UMISPanes/UmisComplete'

class UmisDataForm extends React.Component {
  constructor () {
    super()
    this.state = {
      active: 1
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.formReset = this.formReset.bind(this)
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

  formReset () {
    this.setState({
      active: 1
    })
  }

  render () {
    switch (this.state.active) {
      case 1:
        return <UMISIntro nextStep={this.nextStep} />
      case 2:
        return <UMISParcelLocation previousStep={this.previousStep} nextStep={this.nextStep} />
      case 3:
        return <UMISSourceInformation previousStep={this.previousStep} nextStep={this.nextStep} />
      case 4:
        return <UMISDescribeParcel previousStep={this.previousStep} nextStep={this.nextStep} />
      case 5:
        return <UMISBuildingData previousStep={this.previousStep} nextStep={this.nextStep} />
      case 6:
        return <UMISDemographics previousStep={this.previousStep} nextStep={this.nextStep} />
      case 7:
        return <UMISWorkbookContainer previousStep={this.previousStep} nextStep={this.nextStep} />
      case 8:
        return <UMISComplete previousStep={this.previousStep} formReset={this.formReset} />
    }
  }
}

export default UmisDataForm
