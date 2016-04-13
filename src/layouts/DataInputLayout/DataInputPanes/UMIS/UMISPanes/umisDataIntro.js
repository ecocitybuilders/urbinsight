import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { Well } from 'react-bootstrap'

class UMISIntro extends React.Component {
  constructor (props) {
    super(props)
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
        <h2 style={{'textAlign': 'center'}}>Urban Metabolism Information System</h2>
        <Well>
          <h3 style={{'textAlign': 'center'}}>
            UMIS is an participatory framework for the collection of data on resource
            flows through urban environments to gain insights into how to make cities more sustainable.
          </h3>
        </Well>
        <h5 style={{'textAlign': 'center'}}>To begin adding a parcel audit please click the button below</h5>
        <Button block bsStyle='info' onClick={this.nextStep}>
          Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
        </Button>
      </div>
    )
  }
}

export default UMISIntro
