import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  nextStep: PropTypes.func
}
class UMISSuccess extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render () {
    return (
      <Button bsStyle='success' onClick={this.nextStep}>
        Sucessful Submit
      </Button>
    )
  }
}

export default UMISSuccess
