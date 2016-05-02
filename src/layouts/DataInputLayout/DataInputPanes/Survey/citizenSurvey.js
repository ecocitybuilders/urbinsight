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

type Props = {
  dispatch: PropTypes.func.isRequired,
  submitSurvey: PropTypes.func,
  map: PropTypes.obj
}
class CitizenSurvey extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      active: 1,
      lat: null,
      lon: null
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.formReset = this.formReset.bind(this)
    this.updateValues = this.updateValues.bind(this)
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
    this.setState({
      active: 1,
      lat: null,
      lon: null
    })
  }

  saveValues (fields) {
    return (function () {
      fieldValues = Object.assign({}, fieldValues, fields)
    })()
  }
  updateValues (lat, lon) {
    this.setState({lat: lat, lon: lon})
  }
  getValues () {
    return fieldValues
  }
  render () {
    const { submitSurvey, map } = this.props
    switch (this.state.active) {
      case 1:
        return <CitizenSurveyIntro nextStep={this.nextStep}/>
      case 2:
        return <CitizenSurveyLocation previousStep={this.previousStep}
          map={map}
          nextStep={this.nextStep}
          fieldValues={fieldValues}
          saveValues={this.saveValues}
          lat={this.state.lat}
          lon={this.state.lon}
          updateValues={this.updateValues}/>
      case 3:
        return <CitizenSurveyForm previousStep={this.previousStep}
          fieldValues={fieldValues}
          saveValues={this.saveValues}
          submitSurvey={submitSurvey}
          formReset={this.formReset}
          getValues={this.getValues}/>
    }
  }
}

const mapStateToProps = (state) => {
  const { survey } = state
  const { surveyResponses } = survey
  return {
    surveyResponses
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitSurvey: (response) => {
      dispatch(surveySave(response))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenSurvey)
