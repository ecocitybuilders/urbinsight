import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

type Props = {
  formReset: PropTypes.func,
  map: PropTypes.object,
  cityTag: PropTypes.string
}
class UmisComplete extends React.Component {
  props: Props;
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
    this.props.map.removeLayer('point')
  }
}

export default UmisComplete
