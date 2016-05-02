import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  formReset: PropTypes.func
}
class CitizenSurveySuccess extends React.Component {
  props: Props;
  render () {
    return (
      <div>
        <div>Succesful Sumbit</div>
        <Button bsStyle='success' onClick={this.props.formReset}>Submit Another Form</Button>
      </div>

    )
  }
}

export default CitizenSurveySuccess
