import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

class UMISDemographics extends React.Component {
  static propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render () {
    return (
      <div>
        <h3>Demographics</h3>
        <h5>List number of residents</h5>
        <br/>
        <h4>Seniors and Retired</h4>
        // ng-model='parcel.describeParcel.demographics.seniors.livingWorking' min='0'/
        <Input label='Living and Working on Parcel:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.seniors.livingOffWorking' min='0'/
        <Input label='Living on Parcel, Working/Studying Offsite:' type='number' />
          {/* ng-model='parcel.describeParcel.demographics.seniors.visitingWork' min='0'/*/}
        <Input label='Visiting Parcel for Full-Time Work:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.seniors.visitingPartTimeWork' min='0'/
        <Input lable='Visiting Parcel for Part-Time Work:' type='number' />
        <br />
        <h4>Adults</h4>
        // ng-model='parcel.describeParcel.demographics.adults.livingWorking' min='0'/
        <Input label='Living and Working on Parcel:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.adults.livingOffWorking' min='0'/
        <Input label='Living on Parcel, Working/Studying Offsite:' type='number' />
          {/* ng-model='parcel.describeParcel.demographics.adults.visitingWork' min='0'/*/}
        <Input label='Visiting Parcel for Full-Time Work:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.adults.visitingPartTimeWork' min='0'/
        <Input lable='Visiting Parcel for Part-Time Work:' type='number' />
        <br />
        <h4>Youth</h4>
        // ng-model='parcel.describeParcel.demographics.adults.livingWorking' min='0'/
        <Input label='Living and Working on Parcel:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.adults.livingOffWorking' min='0'/
        <Input label='Living on Parcel, Working/Studying Offsite:' type='number' />
          {/* ng-model='parcel.describeParcel.demographics.adults.visitingWork' min='0'/*/}
        <Input label='Visiting Parcel for Full-Time Work:' type='number' />
        //  ng-model='parcel.describeParcel.demographics.adults.visitingPartTimeWork' min='0'/
        <Input lable='Visiting Parcel for Part-Time Work:' type='number' />
        <br />
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.props.previousStep}>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='success' onClick={this.nextStep}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UMISDemographics
