import React, { PropTypes } from 'react'
import { Button, Well } from 'react-bootstrap'

class CitizenSurveyIntro extends React.Component {
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
  }
  static propTypes = {
    nextStep: PropTypes.func
  };
  nextStep (e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render () {
    return (
      <div className='survey-data'>
        <h3>Welcome to the Citizen Survey</h3>
        <Well>
          <h5>
            The Citizen Survey is a qualitative survey to better understand
            the ways in which the needs of a community are being served or underserved.
            This information can help plan the distribution of new or existing services.
          </h5>
        </Well>
        <Button bsStyle='success' block onClick={this.nextStep}>Begin Survey</Button>
      </div>
    )
  }
}

export default CitizenSurveyIntro
