import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

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
      <div>
        <h3 style={{'textAlign': 'center'}}>Welcome to the Citizen Survey</h3>
        <h5 style={{'textAlign': 'justify'}}>
          The Citizen Survey is a qualitative survey to better understand
          the ways in which the needs of a community are being served or underserved.
          This information can help plan the distribution of new or existing services.
        </h5>
        <div style={{'textAlign': 'center', 'margin': '0 auto', 'width': '15vw'}}>
          <Button bsStyle='success' block onClick={this.nextStep}>Begin Survey</Button>
        </div>
      </div>
    )
  }
}

export default CitizenSurveyIntro
