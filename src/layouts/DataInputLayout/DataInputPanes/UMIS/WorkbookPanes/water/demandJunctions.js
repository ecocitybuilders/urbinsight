import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


class WaterDemandJunctions extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
    <div>
      <h4>Demand Junctions</h4>
        {/*Add functionaility to add a toilet*/}
      <h5>Toilets - Flush Volume</h5>
      <Input label="Flush Volume:" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.toilets.activeToilets.regUsedToiletA.flushVolume"/><br />
      <Input label="Number of Persons Using Toilets:" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.toilets.numPersonsUsingToilets"/><br />
      <Input label="Daily Usage Per Person:" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.toilets.dailyPerPersonUsage"/><br />
      {/*<!-- Add functionality to add a shower -->*/}
      <h5>Hygiene</h5>
      <Input label="Shower Flow (L/min)" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.activeShowers.showerA" /><br />
      <Input label="Typical Shower Duration" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.typicalShowerDuration" /><br />
      {/*<!-- add funtionality to add a batch -->*/}
      <Input label="Weekly Showers Per Person" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.weeklyShowersPerPerson" /><br />
      <Input label="Bath Volume" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.bathVolume" /><br />
      <Input label="Baths Per Weeks" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.bathsPerWeek" /><br />
      <Input label="Minutes of Tap Flow Per Visit" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.minutesOfTapFlowPerVisit" /><br />
      <Input label="Ablution Furation" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.ablutionDuration" /><br />
      <Input label="Number of Occupants Using Washroom" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.numOccupantsUsingWashrooms" /><br />
      <Input label="Number of Visits to Washroom Per Occupant" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.hygiene.numVisitsToWashroomPerOccupant" /><br />

      <h5>Kitchen</h5>
      <Input label="Quantity of Meals Per Day" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.kitchen.quantityOfMealsPerDay" /><br />
      <Input label="Water Used Per Meal" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.kitchen.waterPerMeal" /><br />
      <Input label="Dishwashing Water Per Load" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.kitchen.dishwashingWaterPerLoad" /><br />
      <Input label="Loads of Dishes Per Day" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.kitchen.loadsOfDishesPerDay" /><br />
      <Input label="Water Consumed Per Meal" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.kitchen.waterConsumptionPerMeal" /><br />

      <h5>Laundry</h5>
      <Input label="Persons Using Laundry" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.laundry.personsUsingLaundry" /><br />
      <Input label="Loads per Week per Person" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.laundry.loadsPerWeekPerPerson" /><br />
      <Input label="Water Consumed Per Load" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.laundry.waterConsumptionPerLoad" /><br />

      <h5>Drinking</h5>
      <Input label="Persons Drinking Water On Site" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.drinking.personsDrinkingWaterOnSite" /><br />
      <Input label="Average Quantity of Drink" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.drinking.avgQuantityOfDrink" /><br />
      <Input label="Average Drinks Per Day Per Person" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.drinking.avgDrinksPerDayPerPerson" /><br />

      <h5>Landscape</h5>
      <h6>Irrigation</h6>
      <Input label="Hours Per Week" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.landscape.irrigation.hoursPerWeek" /><br />
      <h6>Pots & Pools</h6>
      <Input label="litersPerLocation" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.landscape.potsPools.litersPerLocation" /><br />
      <Input label="Number of Plants or Pools" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.landscape.potsPools.numPlantsPools" /><br />

      <h5>Surface Cleaning</h5>
      <Input label="Frequency of Interior Surface Cleaning" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.surfaceCleaning.freqOfInteriorSurfaceCleaning" /><br />
      <Input label="Quantity of Water Used For Surface Cleaning" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.surfaceCleaning.quantityOfWaterUsedForSC" /><br />
      <Input label="Number of Times Vehicle Cleaned:" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.surfaceCleaning.numTimesVehicleCleaned" /><br />
      <Input label="Quantity of Water Used for Vehicle Cleaning:" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.surfaceCleaning.quantityOfWaterUsedForVC" /><br />

      <h5>Evaporative Cooling</h5>
      <Input label="Hours per Day During Hot Season" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.evaporativeCooling.hoursPerDayDuringHotSeason" /><br />
      <Input label="Litres Consumed Per Hour" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.evaporativeCooling.litersConsumedPerHour" /><br />

      <h5>Water Customers</h5>
      <Input label="Excess Capacity Per Day" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.waterCustomers.excessCapacityPerDay" /><br />
      <Input label="Percentage of Excess Distributed" type="number" ng-model="parcel.workbooks.water.estimateDemand.demandJunctions.waterCustomers.percentageOfExcessDistributed" /><br />
      <br />
        {/*<div class="col-sm-6">
        <a ui-sref="app.city.pilot.umis.form.waterWorkbook.landCoverPreCalc" class="btn btn-block btn-info">
          <span class="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
        </a>
      </div>
      <div class="col-sm-6">
        <a class="btn btn-block btn-success" ng-click="workbookSelection.workbookIterator()">
          Next Section <span class="glyphicon glyphicon-circle-arrow-right"></span>
        </a>
      </div>*/}
      {/*<Col sm={6}>
        <Button bsStyle="info">
          <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
        </Button>
      </Col>
      <Col sm={6}>
        <Button bsStyle="success">
          Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
        </Button>
      </Col>*/}
    </div>
  )
  }
}

export default WaterDemandJunctions
