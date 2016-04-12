import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'

class UMISBuildingData extends React.Component {
  static propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func
  };
  nextStep (e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render () {
    return (
      <div>
        <h3>Building Data</h3>
        {/* ng-model='parcel.describeParcel.buildingData.buildingAttachmentType*/}
        <Input type='select' label='Buidling Attachment Type:' placeholder=''>
          <option value=''></option>
          <option value='No Building'>No Building</option>
          <option value='Single Family'>Single Family</option>
          <option value='Multi Family (Low Rise)'>Multi Family (4 stories and under)</option>
          <option value='Multi Family (High Rise)'>Multi Family (5 stories and over)</option>
          <option value='Row House'>Row House</option>
          <option value='Mobile'>Mobile</option>
        </Input>
        {/* ng-model='parcel.describeParcel.buildingData.numberOccupiedDwellingUnits'*/}
        <Input type='number' label='Number of Occupied Dwelling Units:' />
         {/* ng-model='parcel.describeParcel.buildingData.buildingAge' */}
        <Input label='Building Age:' type='number'/>
         {/* ng-model='parcel.describeParcel.buildingData.aboveGroundStories' */}
        <Input label='Above Ground Stories:' type='number'/>
         {/* ng-model='parcel.describeParcel.buildingData.belowGroundStories'*/}
        <Input label='Below Ground Stories:' type='number' />
         {/* ng-model='parcel.describeParcel.buildingData.interiorFloorSpace'*/}
        <Input label='Interior Floor Space:' type='number' />
         {/* ng-model='parcel.describeParcel.buildingData.separateDwellingUnits'*/}
        <Input label='Separate Dwelling Units:' type='number' />
         {/* ng-model='parcel.describeParcel.buildingData.foundationType'*/}
        <Input label='Foundation Type:' type='select' placeholder=''>
          <option value=''></option>
          <option value='Slab-on-Grade'>Slab-on-Grade</option>
          <option value='Crawl Space'>Crawl Space</option>
          <option value='Earth Floor'>Earth Floor</option>
          <option value='Unconditioned Parking'>Unconditioned Parking</option>
          <option value='Full Basement'>Full Basement</option>
        </Input>
         {/* ng-model='parcel.describeParcel.buildingData.wallType'*/}
        <Input label='Wall Type:' type='select' placeholder=''>
          <option value=''></option>
          <option value='Solid Masonry'>Solid Masonry</option>
          <option value='Concrete'>Concrete</option>
          <option value='Hollow Core Brick'>Hollow Core Brick</option>
          <option value='Steel Frame'>Steel Frame</option>
          <option value='Wood Frame'>Wood Frame</option>
          <option value='Mud'>Mud</option>
          <option value='Glass'>Glass</option>
        </Input>
         {/* ng-model='parcel.describeParcel.buildingData.roofType'*/}
        <Input label='Roof Type:' type='select' placeholder=''>
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
