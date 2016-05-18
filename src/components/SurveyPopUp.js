import React, { PropTypes } from 'react'

const SurveyPopUp = (props) => <div>
  <h3>Citizen Survey</h3>
  <h4><strong>Employment: </strong>{props.survey.employment}</h4>
  <h4><strong>Healthcare: </strong>{props.survey.healthcare}</h4>
  <h4><strong>Family: </strong>{props.survey.family}</h4>
  <h4><strong>Stability: </strong>{props.survey.stability}</h4>
  <h4><strong>Relationships: </strong>{props.survey.relationships}</h4>
  <h4><strong>Recreation: </strong>{props.survey.recreation}</h4>
  <h4><strong>Education: </strong>{props.survey.education}</h4>
  <h4><strong>Vacation: </strong>{props.survey.vacation}</h4>
  <h4><strong>Housing: </strong>{props.survey.housing}</h4>
  <h4><strong>Environment: </strong>{props.survey.environment}</h4>
  <h4><strong>Discrimination: </strong>{props.survey.discrimination}</h4>
  <h4><strong>Religion: </strong>{props.survey.religion}</h4>
  <h4><strong>Mobility: </strong>{props.survey.mobility}</h4>
  <h4><strong>Movement: </strong>{props.survey.movement}</h4>
  <h4><strong>Safety: </strong>{props.survey.safety}</h4>
  <h4><strong>Governance: </strong>{props.survey.governance}</h4>
</div>

SurveyPopUp.propTypes = {
  survey: PropTypes.object
}

export default SurveyPopUp
