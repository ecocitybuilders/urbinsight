import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func,
  audit: PropTypes.obj
}
class UMISDemographics extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    let data = {
      demographics: {
        seniors: {
          livingWorking: this.refs.seniorLivingWorking.getValue(),
          livingOffsiteWorking: this.refs.seniorLivingOffsiteWorking.getValue(),
          visitingFullTimeWork: this.refs.seniorvisitingFullTimeWork.getValue(),
          visitingPartTimeWork: this.refs.seniorvisitingPartTimeWork.getValue()
        },
        adults: {
          livingWorking: this.refs.adultLivingWorking.getValue(),
          livingOffsiteWorking: this.refs.adultLivingOffsiteWorking.getValue(),
          visitingFullTimeWork: this.refs.adultvisitingFullTimeWork.getValue(),
          visitingPartTimeWork: this.refs.adultvisitingPartTimeWork.getValue()
        },
        youth: {
          livingWorking: this.refs.youthLivingWorking.getValue(),
          livingOffsiteWorking: this.refs.youthLivingOffsiteWorking.getValue(),
          visitingFullTimeWork: this.refs.youthvisitingFullTimeWork.getValue(),
          visitingPartTimeWork: this.refs.youthvisitingPartTimeWork.getValue()
        }
      }
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  render () {
    const { audit } = this.props
    return (
      <div>
        <h3>Demographics</h3>
        <h5>List number of residents</h5>
        <br/>
        <h4>Seniors and Retired</h4>
        <Input ref='seniorLivingWorking' label='Living and Working on Parcel:' type='number' min={0}
          defaultValue={audit && audit.demographics && audit.demographics.seniors
            ? audit.demographics.seniors.livingWorking : ''} />
        <Input ref='seniorLivingOffsiteWorking' label='Living on Parcel, Working/Studying Offsite:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.seniors
            ? audit.demographics.seniors.livingOffsiteWorking : ''} />
        <Input ref='seniorvisitingFullTimeWork' label='Visiting Parcel for Full-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.seniors
            ? audit.demographics.seniors.visitingFullTimeWork : ''} />
        <Input ref='seniorvisitingPartTimeWork' label='Visiting Parcel for Part-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.seniors
            ? audit.demographics.seniors.visitingPartTimeWork : ''} />
        <br />
        <h4>Adults</h4>
        <Input ref='adultLivingWorking' label='Living and Working on Parcel:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.adults
            ? audit.demographics.adults.livingWorking : ''} />
        <Input ref='adultLivingOffsiteWorking' label='Living on Parcel, Working/Studying Offsite:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.adults
            ? audit.demographics.adults.livingOffsiteWorking : ''} />
        <Input ref='adultvisitingFullTimeWork' label='Visiting Parcel for Full-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.adults
            ? audit.demographics.adults.visitingFullTimeWork : ''} />
        <Input ref='adultvisitingPartTimeWork' label='Visiting Parcel for Part-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.adults
            ? audit.demographics.adults.visitingPartTimeWork : ''} />
        <br />
        <h4>Youth</h4>
        <Input ref='youthLivingWorking' label='Living and Working on Parcel:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.youth
            ? audit.demographics.youth.livingWorking : ''} />
        <Input ref='youthLivingOffsiteWorking' label='Living on Parcel, Working/Studying Offsite:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.youth
            ? audit.demographics.youth.livingOffsiteWorking : ''} />
        <Input ref='youthvisitingFullTimeWork' label='Visiting Parcel for Full-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.youth
            ? audit.demographics.youth.visitingFullTimeWork : ''} />
        <Input ref='youthvisitingPartTimeWork' label='Visiting Parcel for Part-Time Work:' type='number'
          defaultValue={audit && audit.demographics && audit.demographics.youth
            ? audit.demographics.youth.visitingPartTimeWork : ''} />
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
