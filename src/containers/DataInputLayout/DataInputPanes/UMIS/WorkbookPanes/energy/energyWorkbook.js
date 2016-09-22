import React, { PropTypes } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import EnergyDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func.isRequired,
  prevSection: PropTypes.func,
  saveValues: PropTypes.func
}

let lightingDataGenerator = function (obj, state) {
  let returnArr = []

  for (var i = 0; i < state.lighting.length; i++) {
    let refString = 'lighting.' + i
    let newLight = {}
    newLight.bulbType = getSelectedValueOfReactNode(obj[refString + '.bulbType'])
    newLight.hoursUsed = getValueOfReactNode(obj[refString + '.hoursUsed'])
    newLight.numUnits = getValueOfReactNode(obj[refString + '.numUnits'])
    newLight.typicalWattage = getValueOfReactNode(obj[refString + '.typicalWattage'])


    returnArr.push(newLight)
  }

  return returnArr
}
let applianceDataGenerator = function (obj, state) {
  let returnArr = []

  for (var i = 0; i < state.appliances.length; i++) {
    let refString = 'appliance.' + i
  }

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

  for (var i = 0; i < state.groundRailTransport.length; i++) {

  }

  return returnArr
}
let airTransportDataGenerator = function (obj, state) {
  let returnArr = []

  return returnArr
}

/* Convenience functions to get data out of react bootstrap components */
function getSelectedValueOfReactNode(reactNode) {
  let mySelect = ReactDOM.findDOMNode(reactNode)
  return mySelect.options[mySelect.selectedIndex].value
}

function getValueOfReactNode(reactNode) {
  return ReactDOM.findDOMNode(reactNode).children[1].value
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
    let newAmount = this.state.lighting
    let lightingObject = {
      bulbType: '',
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
      fuelTypeName: '',
      systemType: 0,
      price: 0
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
      applianceType: '',
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
      name: '',
      timesPerDay: 0
    }
    newAmount.push(waterHeatingObject)
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

  nextSection (e) {
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
// <<<<<<< HEAD
//     let data = {}
// =======
    let data = {
      energy: {
        data: {
          demandJunctions: {
            lighting: lightArr,
            appliances: [],
            spaceHeating: [],
            ventilationAC: [],
            waterHeating: {
              heaters: [],
              activities: []
            },
            groundRailTransport: [],
            airTransport: {
              milesTravelledPerYear: demandObj['airTransport.milesTravelledPerYear'].getValue()
            }
          }
        }
      }
    }

// >>>>>>> 3ce2d6e79e78b08acebbc0af2099127ec99197b1
    this.props.saveValues(data)
    this.props.nextSection()
  }

  render () {
    const { lighting, appliances, spaceHeating, ventilationAC, waterHeating,
       groundRailTransport, airTransport } = this.state

    return (
      <div className='umis-data'>
        <h3 className='umis-data-title'>UMIS Form - Energy Workbook</h3>
        <EnergyDemandJunctions ref='demandJunctions'
          lighting={lighting} appliances={appliances} spaceHeating={spaceHeating} ventilationAC={ventilationAC}
          waterHeating={waterHeating} groundRailTransport={groundRailTransport} airTransport={airTransport}
          addLighting={this.addLighting.bind(this)}
          removeLighting={this.removeLighting.bind(this)}
          addAppliance={this.addAppliance.bind(this)}
          removeAppliance={this.removeAppliance.bind(this)}
          addSpaceHeating={this.addSpaceHeating.bind(this)}
          removeSpaceHeating={this.removeSpaceHeating.bind(this)}
          addVentilationAC={this.addVentilationAC.bind(this)}
          removeVentilationAC={this.removeVentilationAC.bind(this)}
          addWaterHeating={this.addWaterHeating.bind(this)}
          removeWaterHeating={this.removeWaterHeating.bind(this)}
          addGroundRailTransport={this.addGroundRailTransport.bind(this)}
          removeGroundRailTransport={this.removeGroundRailTransport.bind(this)}
          addAirTransport={this.addAirTransport.bind(this)}
          removeAirTransport={this.removeAirTransport.bind(this)}
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
