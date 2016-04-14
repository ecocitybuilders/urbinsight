import React from 'react'
import CitizenSurveyIntro from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyIntro'
import CitizenSurveyLocation from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyLocation'
import CitizenSurveyForm from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyForm'

class CitizenSurvey extends React.Component {
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

  handleClick (panel) {
    let newActive = panel
    this.setState({
      active: newActive
    })
  }
  render () {
    switch (this.state.active) {
      case 1:
        return <CitizenSurveyIntro nextStep={this.nextStep}/>
      case 2:
        return <CitizenSurveyLocation previousStep={this.previousStep} nextStep={this.nextStep}/>
      case 3:
        return <CitizenSurveyForm previousStep={this.previousStep} formReset={this.formReset}/>
    }
  }
}

export default CitizenSurvey
