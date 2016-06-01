import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

type Props = {
  saveValues: PropTypes.func,
  previousStep: PropTypes.func,
  nextStep: PropTypes.func,
  audit: PropTypes.obj
}

class UMISBuildingData extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    let data = {
      buildingData: {
        buildingAttachmentType: this.refs.buildingAttachmentType.getValue(),
        numberOccupiedDwellingUnits: this.refs.numberOccupiedDwellingUnits.getValue(),
        buildingAge: this.refs.buildingAge.getValue(),
        aboveGroundStories: this.refs.aboveGroundStories.getValue(),
        belowGroundStories: this.refs.belowGroundStories.getValue(),
        interiorFloorSpace: this.refs.interiorFloorSpace.getValue(),
        separateDwellingUnits: this.refs.interiorFloorSpace.getValue(),
        foundationType: this.refs.foundationType.getValue(),
        wallType: this.refs.wallType.getValue(),
        roofType: this.refs.roofType.getValue()
      }
    }
    this.props.saveValues(data)
    this.props.nextStep()
  }
  render () {
    const { audit } = this.props
    return (
      <div>
        <h3>Building Data</h3>
        <Input ref='buildingAttachmentType' type='select' label='Buidling Attachment Type:' placeholder=''
          defaultValue={audit && audit.buildingData ? audit.buildingData.buildingAttachmentType : ''}
        >
          <option value=''></option>
          <option value='No Building'>No Building</option>
          <option value='Single Family'>Single Family</option>
          <option value='Multi Family (Low Rise)'>Multi Family (4 stories and under)</option>
          <option value='Multi Family (High Rise)'>Multi Family (5 stories and over)</option>
          <option value='Row House'>Row House</option>
          <option value='Mobile'>Mobile</option>
        </Input>
        <Input ref='numberOccupiedDwellingUnits' label='Number of Occupied Dwelling Units:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.numberOccupiedDwellingUnits : ''}/>
        <Input ref='buildingAge' label='Building Age:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.buildingAge : ''}/>
        <Input ref='aboveGroundStories' label='Above Ground Stories:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.aboveGroundStories : ''}/>
        <Input ref='belowGroundStories' label='Below Ground Stories:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.belowGroundStories : ''}/>
        <Input ref='interiorFloorSpace' label='Interior Floor Space:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.interiorFloorSpace : ''}/>
        <Input ref='separateDwellingUnits' label='Separate Dwelling Units:' type='number'
          defaultValue={audit && audit.buildingData ? audit.buildingData.separateDwellingUnits : ''}/>
        <Input ref='foundationType' label='Foundation Type:' type='select' placeholder=''
          defaultValue={audit && audit.buildingData ? audit.buildingData.foundationType : ''}>
          <option value=''></option>
          <option value='Slab-on-Grade'>Slab-on-Grade</option>
          <option value='Crawl Space'>Crawl Space</option>
          <option value='Earth Floor'>Earth Floor</option>
          <option value='Unconditioned Parking'>Unconditioned Parking</option>
          <option value='Full Basement'>Full Basement</option>
        </Input>
        <Input ref='wallType' label='Wall Type:' type='select' placeholder=''
          defaultValue={audit && audit.buildingData ? audit.buildingData.wallType : ''}>
          <option value=''></option>
          <option value='Solid Masonry'>Solid Masonry</option>
          <option value='Concrete'>Concrete</option>
          <option value='Hollow Core Brick'>Hollow Core Brick</option>
          <option value='Steel Frame'>Steel Frame</option>
          <option value='Wood Frame'>Wood Frame</option>
          <option value='Mud'>Mud</option>
          <option value='Glass'>Glass</option>
        </Input>
        <Input ref='roofType' label='Roof Type:' type='select' placeholder=''
          defaultValue={audit && audit.buildingData ? audit.buildingData.roofType : ''}>
          <option value=''></option>
          <option value='Flat'>Flat</option>
          <option value='Peaked Hard Surface'>Peaked Hard Surface</option>
          <option value='Thatch'>Thatch</option>
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

export default UMISBuildingData
