import React, { PropTypes } from 'react'
import { Button, Input, Col, Row } from 'react-bootstrap'
import DateTimeField from 'react-bootstrap-datetimepicker'

type Props = {
  saveValues: PropTypes.func,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func,
  audit: PropTypes.obj
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
  onChange () {
    return
  }
  render () {
    const { audit } = this.props
    return (
      <div className='umis-data umis-data-source'>
        <h3 className='umis-data-title'>UMIS Form - Source Information</h3>
        <Input ref='author' type='text' label='Author:' placeholder='Enter Name'
          defaultValue={audit && audit.sourceInformation ? audit.sourceInformation.author : ''}
        />
        <label htmlFor='umis-form-date'>Parcel Audit Date: </label>
        <DateTimeField ref='date' id='umis-form-date'
          defaultValue={audit && audit.sourceInformation ? audit.sourceInformation.date : ''} />
        <br />
        <Input ref='neighborhoodID' type='number' label='Neighborhood ID:'
          defaultValue={audit && audit.sourceInformation ? audit.sourceInformation.neighborhoodID : ''}
        />
        <Input ref='timeHorizon' label='Time Horizon:' type='select'
          defaultValue={audit && audit.sourceInformation ? audit.sourceInformation.timeHorizon : ''}
        >
          <option value='2016'>2014</option>
          <option value='2015'>2015</option>
          <option value='2014'>2016</option>
        </Input>
        <br/>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.props.previousStep} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.nextStep} block>
              Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UMISSourceInformation
