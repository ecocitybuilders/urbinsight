import React, { PropTypes } from 'react'
import { Input, ButtonToolbar, Button } from 'react-bootstrap'
import { questionIDs } from 'utils/surveyUtils'

type Props = {
  survey: PropTypes.object,
  surveyDelete: PropTypes.func,
  surveyUpdate: PropTypes.func,
  popup: PropTypes.object
}
class SurveyPopUp extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      'editing': false,
      'owned': props.survey.user === localStorage.getItem('id_token')
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  handleEditClick () {
    this.setState({
      'editing': !this.state.editing
    })
  }
  handleUpdate () {
    let updatedResponses = {}
    questionIDs.forEach(function (questionID) {
      updatedResponses[questionID] = this.refs[questionID].getValue()
    })
    let newSurvey = Object.assign({}, this.props.survey, updatedResponses)
    this.props.surveyUpdate(newSurvey)
  }
  handleDeleteClick () {
    this.props.surveyDelete(this.props.survey._id)
    this.props.popup.remove()
    // IDEA: ReAdd Surveys to Map
  }

  // console.log(props.survey._id)
  render () {
    let questionInputs = questionIDs.map((questionID) => {
      return (
        <Input key={questionID} type='select' ref={questionID}
          defaultValue={'' + this.props.survey[questionID]}>
          <option value='5'>Excellent</option>
          <option value='4'>Good</option>
          <option value='3'>Adequate</option>
          <option value='2'>Insufficient</option>
          <option value='1'>Absent</option>
          <option value='0'>Unknown</option>
        </Input>
      )
    })
    let controlButtons =
      <ButtonToolbar>
        <Button bsStyle='info' onClick={this.handleEditClick} block>Edit</Button>
        <Button bsStyle='danger' onClick={this.handleDeleteClick} block>Delete</Button>
      </ButtonToolbar>
    const { survey } = this.props
    return (
      <div style={{'height': '400px', 'width': '200px', 'overflow': 'auto'}} ref='popup'>
        <h3>Citizen Survey</h3>
        <h4><strong>Employment: </strong>{this.state.editing ? questionInputs[0] : survey.employment}</h4>
        <h4><strong>Healthcare: </strong>{this.state.editing ? questionInputs[1] : survey.healthcare}</h4>
        <h4><strong>Family: </strong>{this.state.editing ? questionInputs[2] : survey.family}</h4>
        <h4><strong>Stability: </strong>{this.state.editing ? questionInputs[3] : survey.stability}</h4>
        <h4><strong>Relationships: </strong>{this.state.editing ? questionInputs[4] : survey.relationships}</h4>
        <h4><strong>Recreation: </strong>{this.state.editing ? questionInputs[5] : survey.recreation}</h4>
        <h4><strong>Education: </strong>{this.state.editing ? questionInputs[6] : survey.education}</h4>
        <h4><strong>Vacation: </strong>{this.state.editing ? questionInputs[7] : survey.vacation}</h4>
        <h4><strong>Housing: </strong>{this.state.editing ? questionInputs[8] : survey.housing}</h4>
        <h4><strong>Environment: </strong>{this.state.editing ? questionInputs[9] : survey.environment}</h4>
        <h4><strong>Discrimination: </strong>{this.state.editing ? questionInputs[10] : survey.discrimination}</h4>
        <h4><strong>Religion: </strong>{this.state.editing ? questionInputs[11] : survey.religion}</h4>
        <h4><strong>Mobility: </strong>{this.state.editing ? questionInputs[12] : survey.mobility}</h4>
        <h4><strong>Movement: </strong>{this.state.editing ? questionInputs[13] : survey.movement}</h4>
        <h4><strong>Safety: </strong>{this.state.editing ? questionInputs[14] : survey.safety}</h4>
        <h4><strong>Governance: </strong>{this.state.editing ? questionInputs[15] : survey.governance}</h4>
        {this.state.owned && !this.state.editing ? controlButtons : null}
        {this.state.owned && this.state.editing
          ? <ButtonToolbar>
            <Button bsStyle='info' onClick={this.handleEditClick} block>Cancel</Button>
            <Button bsStyle='success' onClick={this.handleUpdate} block>Submit</Button>
          </ButtonToolbar>
          : null}
      </div>
    )
  }
}

export default SurveyPopUp
