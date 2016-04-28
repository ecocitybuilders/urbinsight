import React from 'react'
import { connect } from 'react-redux'
import { surveySave } from 'redux/modules/survey'
import CitizenSurveyIntro from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyIntro'
import CitizenSurveyLocation from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyLocation'
import CitizenSurveyForm from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyForm'

let fieldValues = {
  lon: null,
  lat: null,
  employment: null,
  healthcare: null,
  family: null,
  stability: null,
  relationships: null,
  recreation: null,
  education: null,
  vacation: null,
  housing: null,
  environment: null,
  discrimination: null,
  religion: null,
  mobility: null,
  movement: null,
  safety: null,
  governance: null
}

type Props ={
  dispatch: PropTypes.func.isRequired,
  submitSurvey: PropTypes.func
}
class CitizenSurvey extends React.Component {
  props: Props;
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
    let fields = {
      lon: null,
      lat: null,
      employment: null,
      healthcare: null,
      family: null,
      stability: null,
      relationships: null,
      recreation: null,
      education: null,
      vacation: null,
      housing: null,
      environment: null,
      discrimination: null,
      religion: null,
      mobility: null,
      movement: null,
      safety: null,
      governance: null
    }
    fieldValues = Object.assign({}, fieldValues, fields)
  }

  saveValues (fields) {
    return (function () {
      fieldValues = Object.assign({}, fieldValues, fields)
    })()
  }
  render () {
    console.log(this.props)
    const { submitSurvey } = this.props
    switch (this.state.active) {
      case 1:
        return <CitizenSurveyIntro nextStep={this.nextStep}/>
      case 2:
        return <CitizenSurveyLocation previousStep={this.previousStep}
          nextStep={this.nextStep}
          fieldValues={fieldValues}
          saveValues={this.saveValues}
          formReset={this.formReset}/>
      case 3:
        return <CitizenSurveyForm previousStep={this.previousStep}
          fieldValues={fieldValues}
          saveValues={this.saveValues}
          submitSurvey={submitSurvey}/>
    }
  }
}

const mapStateToProps = (state) => {
  // const { survey } = state
  // const { surveyResponses } = survey
  return {
  }
  // const { isAuthenticated, errorMessage } = auth
  // return {
  //   isAuthenticated,
  //   errorMessage
  // }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitSurvey: (responses) => {
      dispatch(surveySave(responses))
    }
    // onLoginClick: (creds) =>
    //   dispatch(loginUser(creds)),
    //
    // onLogoutClick: () =>
    //   dispatch(logoutUser()),
    //
    // onSignUpClick: (creds) =>
    //   dispatch(signUpUser(creds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenSurvey)
