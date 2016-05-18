import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { surveySave } from 'redux/modules/survey'
import CitizenSurveyIntro from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyIntro'
import CitizenSurveyLocation from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyLocation'
import CitizenSurveyForm from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyForm'
import CitizenSurveySuccess from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveySuccess'

let fieldValues = {
  geoCoordinates: [null, null],
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
  map: PropTypes.object,
  isFetching: PropTypes.bool,
  audits: PropTypes.audits,
  inputOpened: PropTypes.bool,
  activeInput: PropTypes.string
}
class CitizenSurvey extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      active: 1,
      geoCoordinates: [null, null]
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
      geoCoordinates: [null, null],
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
      geoCoordinates: [null, null]
    })
  }
  // this is confusing and should be streamlined
  saveValues (fields) {
    return (function () {
      fieldValues = Object.assign({}, fieldValues, fields)
    })()
  }
  updateValues (lat, lon) {
    this.setState({geoCoordinates: [lon, lat]})
  }
  getValues () {
    return fieldValues
  }
  render () {
    const { submitSurvey, map, isFetching } = this.props
    switch (this.state.active) {
      case 1:
        return <CitizenSurveyIntro nextStep={this.nextStep}/>
      case 2:
        return <CitizenSurveyLocation
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          map={map}
          lat={this.state.geoCoordinates[1]}
          lon={this.state.geoCoordinates[0]}
          saveValues={this.saveValues}
          updateValues={this.updateValues}
          formReset={this.formReset}
          inputOpened={this.props.inputOpened}
          audits={this.props.audits}
          activeInput={this.props.activeInput}
          />

      case 3:
        return <CitizenSurveyForm
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          fieldValues={fieldValues}
          getValues={this.getValues}
          saveValues={this.saveValues}
          submitSurvey={submitSurvey}

          />
      case 4:
        return <CitizenSurveySuccess
          isFetching={isFetching}
          formReset={this.formReset}
          map={map}
          />
    }
  }
}

const mapStateToProps = (state) => {
  const { survey } = state
  const { surveyResponses, isFetching } = survey
  return {
    surveyResponses,
    isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitSurvey: (responses) => {
      dispatch(surveySave(responses))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenSurvey)
