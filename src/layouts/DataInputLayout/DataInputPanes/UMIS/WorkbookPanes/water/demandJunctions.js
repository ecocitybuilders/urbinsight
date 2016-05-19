import React from 'react'
import { Input, Button } from 'react-bootstrap'

type Props = {
  addToilet: PropTypes.func,
  removeToilet: PropTypes.func,
  addShower: PropTypes.func,
  removeShower: PropTypes.func,
  toilets: PropTypes.obj,
  showers: PropTypes.obj
}
class WaterDemandJunctions extends React.Component {
  props: Props;

  render () {
    const { toilets, showers } = this.props
    let toiletList = toilets.map(function (value) {
      let refString = 'toilets.activeToilets.' + value + '.flushVolume'
      return <Input label={'Toilet ' + value + ' Flush Volume:'} type='number' ref={refString} />
    })
    let showerList = showers.map(function (value) {
      let refString = 'showers.activeShowers.' + value + '.flowVolume'
      return <Input label={'Shower ' + value + ' Flow (L/min):'} type='number' ref={refString} />
    })
    return (
      <div>
        <h4>Demand Junctions</h4>
          {/* Add functionaility to add a toilet*/}
        <h5>Toilets - Flush Volume</h5>
        <Button onClick={this.props.addToilet}><span className='glyphicon glyphicon-plus'></span>Add Toilet</Button>
        <Button onClick={this.props.removeToilet}>
          <span className='glyphicon glyphicon-minus'></span>Remove Toilet
        </Button>
        {toiletList}
        <Input label='Number of Persons Using Toilets:' type='number' ref='toilets.numPersonsUsingToilets'/><br />
        <Input label='Daily Usage Per Person:' type='number' ref='toilets.dailyPerPersonUsage' defaultValue={0}/><br />
        {/* <!-- Add functionality to add a shower -->*/}
        <h5>Hygiene</h5>
        <Button onClick={this.props.addShower}><span className='glyphicon glyphicon-plus'></span>Add Shower</Button>
        <Button onClick={this.props.removeShower}>
          <span className='glyphicon glyphicon-minus'></span>Remove Shower
        </Button>
        {showerList}
        <Input label='Typical Shower Duration' type='number' ref='hygiene.typicalShowerDuration' /><br />
        <Input label='Weekly Showers Per Person' type='number' ref='hygiene.weeklyShowersPerPerson' /><br />
        {/* <!-- add funtionality to add a bath -->*/}
        <Input label='Bath Volume' type='number' ref='hygiene.bathVolume' /><br />
        <Input label='Baths Per Weeks' type='number' ref='hygiene.bathsPerWeek' /><br />
        <Input label='Minutes of Tap Flow Per Visit' type='number' ref='hygiene.minutesOfTapFlowPerVisit' /><br />
        <Input label='Ablution Duration' type='number' ref='hygiene.ablutionDuration' /><br />
        <Input label='Number of Occupants Using Washroom' type='number'
          ref='hygiene.numOccupantsUsingWashrooms' /><br />
        <Input label='Number of Visits to Washroom Per Occupant' type='number'
          ref='hygiene.numVisitsToWashroomPerOccupant' /><br />
        <h5>Kitchen</h5>
        <Input label='Quantity of Meals Per Day' type='number' ref='kitchen.quantityOfMealsPerDay' /><br />
        <Input label='Water Used Per Meal' type='number' ref='kitchen.waterUsedPerMeal' /><br />
        <Input label='Dishwashing Water Per Load' type='number' ref='kitchen.dishwashingWaterPerLoad' /><br />
        <Input label='Loads of Dishes Per Day' type='number' ref='kitchen.loadsOfDishesPerDay' /><br />
        <Input label='Water Consumed Per Meal' type='number' ref='kitchen.waterConsumptionPerMeal' /><br />

        <h5>Laundry</h5>
        <Input label='Persons Using Laundry' type='number' ref='laundry.personsUsingLaundry' /><br />
        <Input label='Loads per Week per Person' type='number' ref='laundry.loadsPerWeekPerPerson' /><br />
        <Input label='Water Consumed Per Load' type='number' ref='laundry.waterConsumptionPerLoad' /><br />

        <h5>Drinking</h5>
        <Input label='Persons Drinking Water On Site' type='number' ref='drinking.personsDrinkingWaterOnSite' /><br />
        <Input label='Average Quantity of Drink' type='number' ref='drinking.avgQuantityOfDrink' /><br />
        <Input label='Average Drinks Per Day Per Person' type='number' ref='drinking.avgDrinksPerDayPerPerson' /><br />

        <h5>Landscape</h5>
        <h6>Irrigation</h6>
        <Input label='Hours Per Week' type='number' ref='landscape.irrigation.hoursPerWeek' /><br />
        <Input label='Average Flow Rate' type='number' ref='landscape.irrigation.avgFlowRate' /><br />
        <h6>Pots & Pools</h6>
        <Input label='Liters Per Location' type='number' ref='landscape.potsPools.litersPerLocation' /><br />
        <Input label='Number of Plants or Pools' type='number' ref='landscape.potsPools.numPlantsPools' /><br />

        <h5>Surface Cleaning</h5>
        <Input label='Frequency of Interior Surface Cleaning' type='number'
          ref='surfaceCleaning.freqOfInteriorSurfaceCleaning' /><br />
        <Input label='Quantity of Water Used For Surface Cleaning' type='number'
          ref='surfaceCleaning.quantityOfWaterUsedForSC' /><br />
        <Input label='Number of Times Vehicle Cleaned:' type='number'
          ref='surfaceCleaning.numTimesVehicleCleaned' /><br />
        <Input label='Quantity of Water Used for Vehicle Cleaning:' type='number'
          ref='surfaceCleaning.quantityOfWaterUsedForVC' /><br />

        <h5>Evaporative Cooling</h5>
        <Input label='Hours per Day During Hot Season' type='number'
          ref='evaporativeCooling.hoursPerDayDuringHotSeason' /><br />
        <Input label='Litres Consumed Per Hour' type='number' ref='evaporativeCooling.litersConsumedPerHour' /><br />

        <h5>Water Customers</h5>
        <Input label='Excess Capacity Per Day' type='number' ref='waterCustomers.excessCapacityPerDay' /><br />
        <Input label='Percentage of Excess Distributed' type='number'
          ref='waterCustomers.percentageOfExcessDistributed' /><br />
        <br />
      </div>
    )
  }
}

export default WaterDemandJunctions
