import React, { PropTypes } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import EnergyDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func.isRequired,
  prevSection: Proptypes.func,
  saveValues: PropTypes.func
}

let lightingDataGenerator = function (obj, state) {
  let returnArr = []

  for (var i = 0; i < state.lighting.length; i++) {
    let refString = 'lighting.' + i
    returnArr.push({ bulbType: "", numUnits: 0, typicalWattage: 0})
  }

  return returnArr
}
let applianceDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}
let spaceHeatingDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}
let ventilationACDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}
let waterHeatingDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}
let groundRailTransportDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}
let airTransportDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}

class UMISEnergyWorkbook extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      lighting: [],
      appliances: [],
      spaceHeating: [],
      ventilationAC: [],
      waterHeating: [],
      groundRailTransport: [],
      airTransport: []
    }

    this.nextSection = this.nextSection.bind(this)
    this.addLighting = this.addLighting.bind(this)
    this.addAppliance = this.addAppliance.bind(this)
    this.addSpaceHeating = this.addSpaceHeating.bind(this)
    this.addVentilationAC = this.addVentilationAC.bind(this)
    this.addWaterHeating = this.addWaterHeating.bind(this)
    this.addGroundRailTransport = this.addGroundRailTransport.bind(this)
    this.addAirTransport = this.addAirTransport.bind(this)
    this.removeLighting = this.removeLighting.bind(this)
    this.removeAppliance = this.removeAppliance.bind(this)
    this.removeSpaceHeating = this.removeSpaceHeating.bind(this)
    this.removeVentilationAC = this.removeVentilationAC.bind(this)
    this.removeWaterHeating = this.removeWaterHeating.bind(this)
    this.removeGroundRailTransport = this.removeGroundRailTransport.bind(this)
    this.removeAirTransport = this.removeAirTransport.bind(this)
  }

  addLighting () {
    console.log("adding lighting")
    let newAmount = this.state.lighting
    let lightingObject = {
      bulbType: "",
      numUnits: 0,
      hoursUsed: 0,
      typicalWattage: 0
    }
    newAmount.push(lightingObject)
    return this.setState({lighting: newAmount})
  }
  removeLighting (index) {
    let newAmount = this.state.lighting
    newAmount.splice(index, 1)
    console.log("EnergyWorkbook.removeLighting() " + index)
    return this.setState({lighting: newAmount})
  }
  addAppliance () {
    let newAmount = this.state.appliances
    let applianceObject = {
      hoursUsed: 0,
      numUnits: 0,
      typicalWattage: 0
    }
    newAmount.push(applianceObject)
    return this.setState({appliances: newAmount})
  }
  removeAppliance (index) {
    let newAmount = this.state.appliances
    newAmount.splice(index, 1)
    return this.setState({appliances: newAmount})
  }
  addSpaceHeating () {
    let newAmount = this.state.spaceHeating
    let spaceHeatingObject = {
      fuelTypeName: "",
      hoursUsed: 0,
      fuelType: {
        systemType: 0,
        price: 0
      }
    }
    newAmount.push(spaceHeatingObject)
    return this.setState({spaceHeating: newAmount})
  }
  removeSpaceHeating (index) {
    let newAmount = this.state.spaceHeating
    newAmount.splice(index, 1)
    return this.setState({spaceHeating: newAmount})
  }
  addVentilationAC () {
    let newAmount = this.state.ventilationAC
    let ventilationACObject = {
      applianceType: "",
      hoursUsed: 0,
      numUnits: 0,
      typicalWattage: 0
    }
    newAmount.push(ventilationACObject)
    return this.setState({ventilationAC: newAmount})
  }
  removeVentilationAC (index) {
    let newAmount = this.state.ventilationAC
    newAmount.splice(index, 1)
    return this.setState({ventilationAC: newAmount})
  }
  addWaterHeating () {
    let newAmount = this.state.waterHeating
    let waterHeatingObject = {
      type: "",
      timesPerDay: 0
    }
    newAmount.push()
    return this.setState({waterHeating: newAmount})
  }
  removeWaterHeating (index) {
    let newAmount = this.state.waterHeating
    newAmount.splice(index, 1)
    return this.setState({waterHeating: newAmount})
  }
  addGroundRailTransport () {
    let newAmount = this.state.groundRailTransport
    let groundRailTransportObject = {

    }
    newAmount.push(groundRailTransportObject)
    return this.setState({groundRailTransport: newAmount})
  }
  removeGroundRailTransport (index) {
    let newAmount = this.state.groundRailTransport
    newAmount.splice(index, 1)
    return this.setState({groundRailTransport: newAmount})
  }
  addAirTransport () {
    let newAmount = this.state.airTransport
    let airTransportObject = {

    }
    newAmount.push(airTransportObject)
    return this.setState({airTransport: newAmount})
  }
  removeAirTransport (index) {
    let newAmmount = this.state.airTransport
    newAmmount.splice(index, 1)
    return this.setState({airTransport: newAmmount})
  }

  nextSection(e) {
    e.preventDefault()

    let demandObj = this.refs.demandJunctions.refs
    let lightArr = lightingDataGenerator(demandObj, this.state)
    let applianceArr = applianceDataGenerator(demandObj, this.state)
    let spaceHeatingArr = spaceHeatingDataGenerator(demandObj, this.state)
    let ventilationACArr = ventilationACDataGenerator(demandObj, this.state)
    let waterHeatingArr = waterHeatingDataGenerator(demandObj, this.state)
    let groundRailTransport = groundRailTransportDataGenerator(demandObj, this.state)
    let airTransport = airTransportDataGenerator(demandObj, this.state)

    // TODO: save the data from the form
    let data = {
      demandJunctions: {
        lighting: [],
        appliances: {},
        spaceHeating: {},
        ventilationAC: {},
        waterHeating: {},
        groundRailTransport: {},
        airTransport: {}
      }
    }

    this.props.saveValues(data)
    this.props.nextSection()
  }

  render () {
    const { lighting, appliances, spaceHeating, ventilationAC, waterHeating, groundRailTransport, airTransport } = this.state

    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Energy Workbook</h3>
        <EnergyDemandJunctions ref='demandJunctions'
          lighting={lighting} appliances={appliances} spaceHeating={spaceHeating} ventilationAC={ventilationAC}
          waterHeating={waterHeating} groundRailTransport={groundRailTransport} airTransport={airTransport}
          addLighting={this.addLighting}
          removeLighting={this.removeLighting}
          addAppliance={this.addAppliance}
          removeAppliance={this.removeAppliance}
          addSpaceHeating={this.addSpaceHeating}
          removeSpaceHeating={this.removeSpaceHeating}
          addVentilationAC={this.addVentilationAC}
          removeVentilationAC={this.removeVentilationAC}
          addWaterHeating={this.addWaterHeating}
          removeWaterHeating={this.removeWaterHeating}
          addGroundRailTransport={this.addGroundRailTransport}
          removeGroundRailTransport={this.removeGroundRailTransport}
          addAirTransport={this.addAirTransport}
          removeAirTransport={this.removeAirTransport}
        />
        <Row>
          <Col xs={6} sm={6} md={6}>
            <Button bsStyle='info' onClick={this.props.prevSection} block>
              <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
            </Button>
          </Col>
          <Col xs={6} sm={6} md={6} >
            <Button bsStyle='success' onClick={this.nextSection} block>
              Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UMISEnergyWorkbook
