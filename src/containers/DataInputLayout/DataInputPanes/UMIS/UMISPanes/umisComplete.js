import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

class UmisComplete extends React.Component {
  static propTypes = {
    formReset: PropTypes.func,
    map: PropTypes.object,
    cityTag: PropTypes.string
  };
  render () {
    return (
      <div>
        <h2 style={{'textAlign': 'center'}}>Congratulations you've finished a parcel audit</h2>
        {/* <Col sm={6} offset={6}>*/}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Button bsStyle='info' onClick={this.props.formReset}>
          <span className='glyphicon glyphicon-circle-arrow-left'></span>Return to Beginning
        </Button>
        {/* </Col>*/}
      </div>
    )
  }
  componentDidMount () {
    this.props.map.setFilter('lots-hover', ['==', this.props.cityTag, ''])
  }
}

export default UmisComplete
