import React from 'react'
import { Input, Button, Well, Form } from 'react-bootstrap'

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
  lighting: PropTypes.obj,
  appliances: PropTypes.obj,
  heating: PropTypes.obj,
  ventilationAC: PropTypes.obj,
  waterHeating: PropTypes.obj,
  groundRailTransport: PropTypes.obj
}

class EnergyDemandJunctions extends React.Component {
  props: Props;

  render() {

    return (
      <div>
        <h4>Lighting</h4>
        <Button>
          <span className='glyphicon glyphicon-plus'></span> Add Light
        </Button>
        <Well>
          <form>
            <Input ref='' label='Bulb Type:' type='select' placeholder='' defaultValue={''} className='col-lg-4'>
              <option value=''></option>
              <option value='standardIncandescent'>Standard incandescent</option>
              <option value='compactFluorescent'>Compact fluorescent</option>
              <option value='flourescentBallasts'>Flourescent ballasts</option>
              <option value='otherBulbs'>Other bulbs</option>
            </Input>
            <Input label='Hours Used:' type='number' ref='' defaultValue={0} className='col-lg-1'/>
            <Input label='Units:' type='number' ref='' defaultValue={0} className='col-lg-1'/>
            <Input label='Typical Wattage:' type='number' ref='' defaultValue={0} className='col-lg-1'/>
            <Button>
              <span className='glyphicon glyphicon-minus'></span> Remove Light
            </Button>
          </form>
        </Well>

        <h4>Appliances</h4>
        <Button>
          <span className='glyphicon glyphicon-plus'></span> Add Appliance
        </Button>
        <Well>
          <Input ref='' label='Appliance Type:' type='select' placeholder=''
            defaultValue={''}>
            <option value=''></option>
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
          <Input label='Phantom Power Ratio:' type='number' ref='' defaultValue={0}/>
          <Input label='Units:' type='number' ref='' defaultValue={0}/>
          <Input label='Typical wattage:' type='number' ref='' defaultValue={0}/>
          <Button>
            <span className='glyphicon glyphicon-minus'></span> Remove Appliance
          </Button>
        </Well>

        <h4>Space Heating</h4>
        <Button>
          <span className='glyphicon glyphicon-plus'></span> Add Space Heating
        </Button>
        <Well>
          <Input ref='' label='Fuel Type:' type='select' placeholder=''
            defaultValue={''}>
            <option value=''></option>
            <option value='gas'>Gas</option>
            <option value='propane'>Propane</option>
            <option value='electricity'>Electricity</option>
            <option value='oil'>Oil</option>
            <option value='hardwood'>Hardwood</option>
            <option value='softwood'>Softwood</option>
          </Input>
          <Input label='Hours Used:' type='number' ref='' defaultValue={0}/>
          <Input label='System Type:' type='number' ref='' defaultValue={0}/>
          <Input label='Fuel Type:' type='number' ref='' defaultValue={0}/>
          <Button>
            <span className='glyphicon glyphicon-minus'></span> Remove Space Heating
          </Button>
        </Well>

        <h4>Ventilation AC</h4>
        <Button>
          <span className='glyphicon glyphicon-plus'></span> Add Ventilation AC
        </Button>
        <Well>
          <Input ref='' label='Fuel Type:' type='select' placeholder=''
            defaultValue={''}>
            <option value=''></option>
            <option value='floorFan'>Floor Fan</option>
            <option value='standardCeilingFan'>Standard Ceiling Fan</option>
            <option value='kitchenExhaustFan'>Kitchen Exhaust Fan</option>
            <option value='bathroomExhaustFan'>Bathroom Exhaust Fan</option>
            <option value='airConditionerWindowUnit'>Air Conditioner Window Unit</option>
            <option value='centralAirConditioningUnit'>Central Air Conditioning Unit</option>
            <option value='splitAirConditioner'>Split Air Conditioner</option>
          </Input>
          <Input label='Hours Used:' type='number' ref='' defaultValue={0}/>
          <Input label='Units:' type='number' ref='' defaultValue={0}/>
          <Input label='Typical Wattage:' type='number' ref='' defaultValue={0}/>
          <Button>
            <span className='glyphicon glyphicon-minus'></span> Remove Ventilation AC
          </Button>
        </Well>

        <h4>Water Heating</h4>
        <Well>
          <Input label='Shower:' type='number' ref='' defaultValue={0}/>
          <Input label='Laundry Machine:' type='number' ref='' defaultValue={0}/>
          <Input label='Dish Washer:' type='number' ref='' defaultValue={0}/>
          <Input label='Kitchen Faucet Flow:' type='number' ref='' defaultValue={0}/>
          <Input label='Bathroom Faucet Flow:' type='number' ref='' defaultValue={0}/>
        </Well>
        <Button>
          <span className='glyphicon glyphicon-plus'></span> Add Water Heater
        </Button>
        <Well>
          <Input ref='' label='Fuel Type:' type='select' placeholder=''
            defaultValue={''}>
            <option value=''></option>
            <option value='Gas'></option>
            <option value='Electric'></option>
          </Input>
          <Input label='Units:' type='number' ref='' defaultValue={0}/>
          <Button>
            <span className='glyphicon glyphicon-minus'></span> Remove Water Heater
          </Button>
        </Well>

        <h4>Ground Rail Transportation</h4>
      </div>
    )
  }
}

export default EnergyDemandJunctions
