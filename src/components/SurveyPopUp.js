import React, { PropTypes } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

type Props = {
  survey: PropTypes.object,
  surveyDelete: PropTypes.func,
  surveyUpdate: PropTypes.func
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
  }
  handleEditClick () {
    this.setState({
      'editing': !this.state.editing
    })
  }
  handleDeleteClick () {
    this.props.surveyDelete(this.props.survey._id)
  }

  // console.log(props.survey._id)
  render () {
    let controlButtons =
      <ButtonToolbar>
        <Button bsStyle='info' onClick={this.handleEditClick}>Edit</Button>
        <Button bsStyle='danger' onClick={this.handleDeleteClick}>Delete</Button>
      </ButtonToolbar>
    const { survey } = this.props
    return (
      <div>
        <h3>Citizen Survey</h3>
        {this.state.owned && controlButtons}
        <h4><strong>Employment: </strong>{survey.employment}</h4>
        <h4><strong>Healthcare: </strong>{survey.healthcare}</h4>
        <h4><strong>Family: </strong>{survey.family}</h4>
        <h4><strong>Stability: </strong>{survey.stability}</h4>
        <h4><strong>Relationships: </strong>{survey.relationships}</h4>
        <h4><strong>Recreation: </strong>{survey.recreation}</h4>
        <h4><strong>Education: </strong>{survey.education}</h4>
        <h4><strong>Vacation: </strong>{survey.vacation}</h4>
        <h4><strong>Housing: </strong>{survey.housing}</h4>
        <h4><strong>Environment: </strong>{survey.environment}</h4>
        <h4><strong>Discrimination: </strong>{survey.discrimination}</h4>
        <h4><strong>Religion: </strong>{survey.religion}</h4>
        <h4><strong>Mobility: </strong>{survey.mobility}</h4>
        <h4><strong>Movement: </strong>{survey.movement}</h4>
        <h4><strong>Safety: </strong>{survey.safety}</h4>
        <h4><strong>Governance: </strong>{survey.governance}</h4>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    surveyDelete: (id) => {
      dispatch(null)
    },
    surveyUpdate: (survey) => {
      dispatch(null)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyPopUp)
