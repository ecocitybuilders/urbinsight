import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  formReset: PropTypes.func,
  map: PropTypes.object
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
  componentDidMount () {
    this.props.map.removeLayer('point')
    this.props.map.removeSource('point')
  }
}

export default CitizenSurveySuccess
