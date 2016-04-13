import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

class UmisComplete extends React.Component {
  static propTypes = {
    formReset: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }

  render () {
    return (
      <div>
        <h2 style={{'textAlign': 'center'}}>Congratulations you've finished a parcel audit</h2>
        {/* <Col sm={6} offset={6}>*/}
        <Button bsStyle='info' onClick={this.props.formReset}>
          <span className='glyphicon glyphicon-circle-arrow-left'></span>Return to Beginning
        </Button>
        {/* </Col>*/}
      </div>
    )
  }
}

export default UmisComplete
