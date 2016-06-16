import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { surveySave, saveSurveyForm, resetSurveyForm } from 'redux/modules/survey'
import CitizenSurveyIntro from './SurveyPanes/citizenSurveyIntro'
import CitizenSurveyLocation from './SurveyPanes/citizenSurveyLocation'
import CitizenSurveyForm from './SurveyPanes/citizenSurveyForm'
import CitizenSurveySuccess from './SurveyPanes/citizenSurveySuccess'

// let fieldValues = {
//   geoCoordinates: [null, null],
//   employment: null,
//   healthcare: null,
//   family: null,
//   stability: null,
//   relationships: null,
//   recreation: null,
//   education: null,
//   vacation: null,
//   housing: null,
//   environment: null,
//   discrimination: null,
//   religion: null,
//   mobility: null,
//   movement: null,
//   safety: null,
//   governance: null
// }

type Props = {
  dispatch: PropTypes.func.isRequired,
  surveySubmit: PropTypes.func,
  map: PropTypes.object,
  isFetching: PropTypes.bool,
  survey_form: PropTypes.object,
  // NEED TO CHANGE
  inputOpened: PropTypes.bool,
  activeInput: PropTypes.string,
  surveyFormSave: PropTypes.func,
  surveyFormReset: PropTypes.func,
  mapClickHandler: PropTypes.func
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
    this.saveValues = this.saveValues.bind(this)
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
    // let fields = {
    //   geoCoordinates: [undefined, undefined],
    //   employment: null,
    //   healthcare: null,
    //   family: null,
    //   stability: null,
    //   relationships: null,
    //   recreation: null,
    //   education: null,
    //   vacation: null,
    //   housing: null,
    //   environment: null,
    //   discrimination: null,
    //   religion: null,
    //   mobility: null,
    //   movement: null,
    //   safety: null,
    //   governance: null
    // }
    this.props.surveyFormReset()
    this.setState({
      active: 1
    })
  }
  // this is confusing and should be streamlined
  saveValues (fields) {
    this.props.surveyFormSave(fields)
  }

  render () {
    const { surveySubmit, map, isFetching, survey_form } = this.props
    switch (this.state.active) {
      case 1:
        return <CitizenSurveyIntro nextStep={this.nextStep}/>
      case 2:
        return <CitizenSurveyLocation
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          saveValues={this.saveValues}
          formReset={this.formReset}
          inputOpened={this.props.inputOpened}
          survey={survey_form}
          activeInput={this.props.activeInput}
          mapClickHandler={this.props.mapClickHandler}
          map={map}
          />

      case 3:
        return <CitizenSurveyForm
          previousStep={this.previousStep}
          nextStep={this.nextStep}
          survey={survey_form}
          surveySubmit={surveySubmit}

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
  const { surveyResponses, isFetching, survey_form } = survey
  return {
    surveyResponses,
    isFetching,
    survey_form
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    surveySubmit: (responses) => {
      dispatch(surveySave(responses))
    },
    surveyFormSave: (repsonses) => {
      dispatch(saveSurveyForm(repsonses))
    },
    surveyFormReset: () => {
      dispatch(resetSurveyForm())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenSurvey)
