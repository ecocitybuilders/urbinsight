import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'

type Props = {
  saveValues: PropTypes.func,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func
}
class UMISSourceInformation extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    // date is saved as a unix date
    let data = {
      sourceInformation: {
        author: this.refs.author.getValue(),
        date: this.refs.date.getValue(),
        neighborhoodID: this.refs.neighborhoodID.getValue(),
        timeHorizon: this.refs.timeHorizon.getValue()
      }
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  render () {
    return (
      <div>
        <h3>Source Information</h3>
        <Input ref='author' type='text' label='Author:' />
        {/* parcel.date*/}
        <label htmlFor='umis-form-date'>Parcel Audit Date: </label>
        <DateTimeField ref='date' id='umis-form-date'/>
         {/* These would be populated for valid values*/}
        <Input ref='neighborhoodID' type='number' label='Neighborhood ID:' />
        {/* ng-model='parcel.timeHorizon'*/}
        <Input ref='timeHorizon' label='Time Horizon:' type='select'>
          <option value='2014'>2014</option>
          <option value='2015'>2015</option>
          <option value='2016'>2016</option>
        </Input>
        <br/>
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

export default UMISSourceInformation
