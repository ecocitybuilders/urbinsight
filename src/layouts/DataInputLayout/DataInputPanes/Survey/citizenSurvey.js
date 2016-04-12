import React from 'react'
import CitizenSurveyIntro from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyIntro'
import CitizenSurveyLocation from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyLocation'
import CitizenSurveyForm from 'layouts/DataInputLayout/DataInputPanes/Survey/SurveyPanes/citizenSurveyForm'

class CitizenSurvey extends React.Component {
  constructor () {
    super()
    this.state = {
      active: 'INTRO'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (panel) {
    let newActive = panel
    this.setState({
      active: newActive
    })
  }
  render () {
    let active = this.state.active
    return (
      <div id='survey-form-container'>
        {active === 'INTRO' ? (
          <CitizenSurveyIntro handleClick={this.handleClick} />
        ) : active === 'LOCATION' ? (
          <CitizenSurveyLocation handleClick={this.handleClick}/>
        ) : active === 'FORM' ? (
          <CitizenSurveyForm handleClick={this.handleClick}/>
        ) : null}
      </div>
    )
  }
}

export default CitizenSurvey
