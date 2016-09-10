import React from 'react'
import { Input, Button, Well, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

type Props = {
  addLighting: PropTypes.func,
  removeLighting: PropTypes.func,
  addAppliance: PropTypes.func,
  removeAppliance: PropTypes.func,
  addSpaceHeating: PropTypes.func,
  removeSpaceHeating: PropTypes.func,
  addVentilationAC: PropTypes.func,
  removeVentilationAC: PropTypes.func,
  addWaterHeating: PropTypes.func,
  removeWaterHeating: PropTypes.func,
  addGroundRailTransport: PropType.func,
  removeGroundRailTransport: PropTypes.func,
  addAirTransport: PropTypes.func,
  removeAirTransport: PropTypes.func,
  lighting: PropTypes.obj,
  appliances: PropTypes.obj,
  heating: PropTypes.obj,
  ventilationAC: PropTypes.obj,
  waterHeating: PropTypes.obj,
  groundRailTransport: PropTypes.obj,
  airTransport: PropTypes.obj
}

class EnergyDemandJunctions extends React.Component {
  props: Props;

  render() {
    const { lighting, appliances, spaceHeating, ventilationAC, waterHeating, groundRailTransport, airTransport } = this.props

    let lightingList = lighting.map((value, index) => {
      let refString = "lighting." + index
      return (
        <Well>
          <form>
            <div className='row'>
              <div className='col-lg-3'>
                <ControlLabel>Bulb Type: </ControlLabel>
                <FormControl componentClass="select" ref={refString + '.bulbType'}>
                  <option value='standardIncandescent'>Standard incandescent</option>
                  <option value='compactFluorescent'>Compact fluorescent</option>
                  <option value='flourescentBallasts'>Flourescent ballasts</option>
                  <option value='otherBulbs'>Other bulbs</option>
                </FormControl>
              </div>
            </div>
            <div className='row'>
              <Input label='Hours Used:' type='number' ref={refString + '.hoursUsed'} defaultValue={0} className='col-lg-2'/>
            </div>
            <div className='row'>
              <Input label='Units:' type='number' ref={refString + '.numUnits'} defaultValue={0} className='col-lg-2'/>
            </div>
            <div className='row'>
              <Input label='Typical Wattage:' type='number' ref={refString + '.typicalWattage'} defaultValue={0} className='col-lg-2'/>
            </div>
            <Button className='btn btn-danger' onClick={() => this.props.removeLighting(index)}>
              <span className='glyphicon glyphicon-minus'></span> Remove Lighting
            </Button>
          </form>
        </Well>
      )
    })

    let applianceList = appliances.map((value, index) => {
      let refString = "appliance." + index
      return (
        <Well>
          <div className='row'>
            <div className='col-lg-3'>
              <Input ref={refString + '.fuelTypeName'} label='Appliance Type:' type='select' placeholder='' defaultValue={''}>
                <option value='television'>Television</option>
                <option value='chargeMP3Player'>Charge iPod  or MP3 player</option>
                <option value='chargeHandHeldVideoGames'>Charge hand-held video games</option>
                <option value='videoGameConsole'>Video game console</option>
                <option value='DVDOrVHSPlayer'>DVD or VHS player</option>
                <option value='desktopComputer'>Desktop computer</option>
                <option value='chargeLaptopComputer'>Charge a laptop computer</option>
                <option value='chargeCellPhone'>Charge a cell phone</option>
                <option value='chargeCordlessPhone'>Charge a cordless telephone</option>
                <option value='hairDryer'>Hair dryer</option>
                <option value='curlingOrStraighteningIron'>Curling or straightening iron</option>
                <option value='electricStoveTop'>Cook on the electric stove top</option>
                <option value='electricOven'>Bake in an electric oven</option>
                <option value='gasStoveTop'>Gas stove top</option>
                <option value='gasOven'>Gas oven</option>
                <option value='microwave'>Microwave</option>
                <option value='electricKettle'>Electric kettle</option>
                <option value='foodProcessor'>Food processor</option>
                <option value='toaster'>Toaster</option>
                <option value='refrigerator'>Refrigerator</option>
                <option value='useDishwasher'>Use dishwasher</option>
                <option value='waterPump'>Water pump</option>
                <option value='deepFreezer'>Deep freezer</option>
                <option value='automaticWashingMachine'>Automatic washing machine</option>
                <option value='semiautomaticWashingMachine'>Semi-automatic washing machine</option>
                <option value='clothesDryer'>Clothes dryer</option>
                <option value='ironClothing'>Iron clothing</option>
                <option value='vaccum'>Vacuum</option>
              </Input>
            </div>
          </div>
          <div className='row'>
            <Input label='Phantom Power Ratio:' type='number' ref={refString + '.phantomPowerRatio'} defaultValue={0} className='col-lg-2'/>
          </div>
          <div className='row'>
            <Input label='Units:' type='number' ref={refString + '.numUnits'} defaultValue={0} className='col-lg-2'/>
          </div>
          <div className='row'>
            <Input label='Typical wattage:' type='number' ref={refString + '.typicalWattage'} defaultValue={0} className='col-lg-2'/>
          </div>
          <Button className='btn btn-danger' onClick={() => this.props.removeAppliance(index)}>
            <span className='glyphicon glyphicon-minus'></span> Remove Appliance
          </Button>
        </Well>
      )
    })

    let spaceHeatingList = spaceHeating.map((value, index) => {
      let refString = "spaceHeating." + index
      return (
        <Well>
          <div className='row'>
            <div className='col-lg-3'>
              <Input ref={refString + '.fuelTypeName'} label='Fuel Type:' type='select'>
                <option value='gas'>Gas</option>
                <option value='propane'>Propane</option>
                <option value='electricity'>Electricity</option>
                <option value='oil'>Oil</option>
                <option value='hardwood'>Hardwood</option>
                <option value='softwood'>Softwood</option>
              </Input>
            </div>
          </div>
          <div className='row'>
            <Input label='Hours Used:' type='number' ref={refString + '.hoursUsed'} defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='System Type:' type='number' ref={refString + '.systemType'} defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Price:' type='number' ref={refString + '.price'} defaultValue={0} className='col-lg-2' />
          </div>
          <Button className='btn btn-danger' onClick={() => this.props.removeSpaceHeating(index)}>
            <span className='glyphicon glyphicon-minus'></span> Remove Space Heating
          </Button>
        </Well>
      )
    })

    let ventilationACList = ventilationAC.map((value, index) => {
      let refString = "ventilationAC." + index
      return (
        <Well>
          <div className='row'>
            <div className='col-lg-3'>
              <Input ref={refString + '.acType'} label='Type:' type='select'>
                <option value='floorFan'>Floor Fan</option>
                <option value='standardCeilingFan'>Standard Ceiling Fan</option>
                <option value='kitchenExhaustFan'>Kitchen Exhaust Fan</option>
                <option value='bathroomExhaustFan'>Bathroom Exhaust Fan</option>
                <option value='airConditionerWindowUnit'>Air Conditioner Window Unit</option>
                <option value='centralAirConditioningUnit'>Central Air Conditioning Unit</option>
                <option value='splitAirConditioner'>Split Air Conditioner</option>
              </Input>
            </div>
          </div>
          <div className='row'>
            <Input label='Hours Used:' type='number' ref={refString + '.hoursUsed'} defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Units:' type='number' ref={refString + '.numUnits'} defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Typical Wattage:' type='number' ref={refString + '.typicalWattage'} defaultValue={0} className='col-lg-2' />
          </div>
          <Button className='btn btn-danger' onClick={() => this.props.removeVentilationAC(index)}>
            <span className='glyphicon glyphicon-minus'></span> Remove Ventilation AC
          </Button>
        </Well>
      )
    })

    let waterHeatingList = waterHeating.map((value, index) => {
      let refString = "waterHeating.heaters." + index
      return (
        <Well>
          <div className='row'>
            <div className='col-lg-3'>
              <Input ref={refString + '.type'} label='Fuel Type:' type='select'>
                <option value='gas'>Gas</option>
                <option value='electric'>Electric</option>
              </Input>
            </div>
          </div>
          <Button className='btn btn-danger' onClick={() => this.props.removeWaterHeating(index)}>
            <span className='glyphicon glyphicon-minus'></span> Remove Water Heater
          </Button>
        </Well>
      )
    })

    return (
      <div className='contianer'>
        <div className='row'>
          <div className='col-lg-2'>
            <h4>Lighting</h4>
          </div>
          <div className='col-lg-10'>
            <Button className='btn-success btn col-lg-2 add-btn' onClick={() => this.props.addLighting()}>
              <span className='glyphicon glyphicon-plus'></span> Add Lighting
            </Button>
          </div>
        </div>
        {lightingList}

        <div className='row energy-section'>
          <div className='col-lg-2'>
            <h4>Appliances</h4>
          </div>
          <div className='col-lg-10'>
            <Button className='btn-success btn col-lg-2 add-btn' onClick={() => this.props.addAppliance()}>
              <span className='glyphicon glyphicon-plus'></span> Add Appliance
            </Button>
          </div>
        </div>
        {applianceList}

        <div className='row energy-section'>
          <div className='col-lg-2'>
            <h4>Space Heating</h4>
          </div>
          <div className='col-lg-10'>
            <Button className='btn-success btn col-lg-2 add-btn' onClick={() => this.props.addSpaceHeating()}>
              <span className='glyphicon glyphicon-plus'></span> Add Space Heating
            </Button>
          </div>
        </div>
        {spaceHeatingList}

        <div className='row energy-section'>
          <div className='col-lg-2'>
            <h4>Ventilation AC</h4>
          </div>
          <div className='col-lg-10'>
            <Button className='btn-success btn col-lg-2 add-btn' onClick={() => this.props.addVentilationAC()}>
              <span className='glyphicon glyphicon-plus'></span> Add Ventilation AC
            </Button>
          </div>
        </div>
        {ventilationACList}


        <div className='row energy-section'>
          <div className='col-lg-2'>
            <h4>Water Heating</h4>
          </div>
          <div className='col-lg-10'>
            <Button className='btn-success btn col-lg-2 add-btn' onClick={() => this.props.addWaterHeating()}>
              <span className='glyphicon glyphicon-plus'></span> Add Water Heater
            </Button>
          </div>
        </div>
        {waterHeatingList}
        <Well>
          <h4>Water Heating Activities</h4>
          <div className='row'>
            <Input label='Shower:' type='number' ref='shower' defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Laundry Machine:' type='number' ref='laundryMachine' defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Dish Washer:' type='number' ref='dishwasher' defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Kitchen Faucet Flow:' type='number' ref='kitchenFaucetFlow' defaultValue={0} className='col-lg-2' />
          </div>
          <div className='row'>
            <Input label='Bathroom Faucet Flow:' type='number' ref='kitchenFaucetFlow' defaultValue={0} className='col-lg-2' />
          </div>
        </Well>


        <h4 className='energy-section'>Ground Transportation</h4>
        <Well>
          <h4>Monday</h4>
          <Form className='form-inline'>
            <Input label='Miles traveled:' type='number' ref='groundRailTransport.0.milesTravelled' defaultValue={0} />
            <Input ref='' label='Mode of transport:' type='select' placeholder='' defaultValue={''}>
              <option value=''></option>
              <option value='conventionalBus'>Conventional bus</option>
              <option value='hybridElectricBus'>Hybrid electric bus</option>
              <option value='motorcycle'>Motorcycle</option>
              <option value='personalLightTruck'>Personal light truck</option>
              <option value='car1pass'>Car with one passenger</option>
              <option value='car2pass'>Car with twi passengers</option>
              <option value='car4pass'>Car with four passengers</option>
              <option value='commuterRail'>Commuter rail</option>
              <option value='intercityRail'>Innercity rail</option>
            </Input>
          </Form>
        </Well>


        <h4 className='energy-section'>Air Transportation</h4>
        <Well>
          <Input label='Miles traveled per year:' type='number' ref='airTransport.milesTravelledPerYear' defaultValue={0} />
        </Well>
      </div>
    )
  }
}

export default EnergyDemandJunctions
