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
      <div className='umis-data umis-data-intro'>
        <h2 className='umis-data-title'>Urban Metabolism Information System</h2>
        <div className='umis-data-intro-body'>
          <Well>
            <h4>
              UMIS is an participatory framework for the collection of data on resource
              flows through urban environments to gain insights into how to make cities more sustainable.
            </h4>
          </Well>
          <h6>To begin adding a parcel audit please click the button below</h6>
          <Button block bsStyle='info' onClick={this.nextStep}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </div>
      </div>
    )
  }
}

export default UMISIntro
