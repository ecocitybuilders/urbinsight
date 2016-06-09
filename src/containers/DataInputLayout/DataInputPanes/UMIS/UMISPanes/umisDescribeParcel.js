import React, { PropTypes } from 'react'
import { Button, Input, Col, Row } from 'react-bootstrap'

type Props = {
  previousStep: PropTypes.func,
  nextStep: PropTypes.func,
  saveValues: PropTypes.func,
  audit: PropTypes.obj
}
class UMISDescribeParcel extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    let data = {
      parcelIdentification: {
        parcelType: this.refs.parcelType.getValue(),
        designatedLandUse: this.refs.designatedLandUse.getValue(),
        actualLandUse: this.refs.actualLandUse.getValue(),
        parcelArea: this.refs.parcelArea.getValue(),
        buildingFootprint: this.refs.buildingFootprint.getValue()
      }
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  render () {
    const { audit } = this.props
    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Describe Parcel</h3>
        <Input ref='parcelType'
          type='select'label='Parcel Type:' placeholder='Generic Parcel'
          defaultValue={audit && audit.parcelIdentification
            ? audit.parcelIdentification.parcelType
            : ''}>
          <option value='Generic Parcel'>Generic Parcel</option>
        </Input>
        <Input ref='designatedLandUse' type='select' label='Designated Land Use:' placeholder=''
          defaultValue={audit && audit.parcelIdentification
            ? audit.parcelIdentification.designatedLandUse
            : ''}>
          <option value=''></option>
          <option value='Open Space'>Open Space</option>
          <option value='Residential'>Residential</option>
          <option value='Informal'>Informal</option>
          <option value='Commercial'>Commercial</option>
          <option value='Institutional'>Institutional</option>
          <option value='Industrial'>Industrial</option>
          <option value='Municipal'>Municipal</option>
        </Input>
        <Input ref='actualLandUse' type='select' label='Actual Land Use:' placeholder=''
          defaultValue={audit && audit.parcelIdentification
            ? audit.parcelIdentification.actualLandUse
            : ''}>
          <option value=''></option>
          <option value='Open Space'>Open Space</option>
          <option value='Residential'>Residential</option>
          <option value='Informal'>Informal</option>
          <option value='Commercial'>Commercial</option>
          <option value='Institutional'>Institutional</option>
          <option value='Industrial'>Industrial</option>
          <option value='Municipal'>Municipal</option>
        </Input>
        <Input ref='parcelArea' type='number' label='Parcel Area' min={0}
          defaultValue={audit && audit.parcelIdentification
            ? audit.parcelIdentification.parcelArea
            : ''}/>
        <Input ref='buildingFootprint' type='number' label='Building Footprint' min={0}
          defaultValue={audit && audit.parcelIdentification
            ? audit.parcelIdentification.buildingFootprint
            : ''} />
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

export default UMISDescribeParcel
