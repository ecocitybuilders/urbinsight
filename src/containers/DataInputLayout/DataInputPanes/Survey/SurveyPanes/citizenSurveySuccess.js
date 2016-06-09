import React, { PropTypes } from 'react'
import { Button, Well } from 'react-bootstrap'

type Props = {
  formReset: PropTypes.func,
  map: PropTypes.object
}
class CitizenSurveySuccess extends React.Component {
  props: Props;
  render () {
    return (
      <div className='survey-data'>
        <h2>Congratulations!</h2>
        <Well>
          <h5>
            You've successfully submitted a citizen survey.
            Next steps can be to compare this data to other surveys that have been taken.
            Additionally, you can view the visualization dashboard to see the aggregated data for an area.
          </h5>
        </Well>
        <Button bsStyle='success' block onClick={this.props.formReset}>Submit Another Form</Button>
      </div>
    )
  }
  componentDidMount () {
    this.props.map.removeLayer('point')
  }
}

export default CitizenSurveySuccess
