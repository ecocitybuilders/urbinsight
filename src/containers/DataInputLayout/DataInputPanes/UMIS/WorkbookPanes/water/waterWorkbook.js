import React, { PropTypes } from 'react'
import { Button, Col } from 'react-bootstrap'
import LandcoverPreCalc from './LandcoverPreCalc'
import WaterDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func,
  saveValues: PropTypes.func
}

let landCoverDataGenerator = function (obj) {
  let returnObj = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      returnObj[key] = obj[key].getValue()
    }
  }
  return returnObj
}
let toiletDataGenerator = function (obj, state) {
  let returnArr = []
  for (var i = 1; i <= state.toilets.length; i++) {
    let refString = 'toilets.activeToilets.' + i + '.flushVolume'
    returnArr.push({ id: i, flushVolume: obj[refString].getValue() })
  }
  return returnArr
}
let showerDataGenerator = function (obj, state) {
  let returnArr = []
  for (var i = 1; i <= state.showers.length; i++) {
    let refString = 'showers.activeShowers.' + i + '.flowVolume'
    returnArr.push({ id: i, flowVolume: obj[refString].getValue() })
  }
  return returnArr
}

class UMISWaterWorkbook extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      toilets: [1],
      showers: [1]
    }
    this.nextSection = this.nextSection.bind(this)
    this.addToilet = this.addToilet.bind(this)
    this.addShower = this.addShower.bind(this)
    this.removeToilet = this.removeToilet.bind(this)
    this.removeShower = this.removeShower.bind(this)
  }
  addToilet () {
    let newAmount = this.state.toilets
    newAmount.push(newAmount.length + 1)
    return this.setState({toilets: newAmount})
  }
  removeToilet () {
    let newAmount = this.state.toilets
    newAmount.pop()
    return this.setState({toilets: newAmount})
  }
  addShower () {
    let newAmount = this.state.showers
    newAmount.push(newAmount.length + 1)
    return this.setState({showers: newAmount})
  }
  removeShower () {
    let newAmount = this.state.showers
    newAmount.pop()
    return this.setState({showers: newAmount})
  }

  nextSection (e) {
    e.preventDefault()
    let landCoverObj = landCoverDataGenerator(this.refs.landCoverPreCalc.refs)
    let demandObj = this.refs.demandJunctions.refs
    let toiletArr = toiletDataGenerator(demandObj, this.state)
    let showerArr = showerDataGenerator(demandObj, this.state)
    // write a data generation function that checks for the refs presence and then will update the datastore

    let data = {
      water: {
        data: {
          landCoverPreCalc: landCoverObj,
          demandJunctions: {
            toilets: {
              activeToilets: toiletArr,
              numPersonsUsingToilets: demandObj['toilets.numPersonsUsingToilets'].getValue(),
              dailyPerPersonUsage: demandObj['toilets.dailyPerPersonUsage'].getValue()
            },
            hygiene: {
              activeShowers: showerArr,
              typicalShowerDuration: demandObj['hygiene.typicalShowerDuration'].getValue(),
              weeklyShowersPerPerson: demandObj['hygiene.weeklyShowersPerPerson'].getValue(),
              bathVolume: demandObj['hygiene.bathVolume'].getValue(),
              bathsPerWeek: demandObj['hygiene.bathsPerWeek'].getValue(),
              minutesOfTapFlowPerVisit: demandObj['hygiene.minutesOfTapFlowPerVisit'].getValue(),
              ablutionDuration: demandObj['hygiene.ablutionDuration'].getValue(),
              numOccupantsUsingWashrooms: demandObj['hygiene.numOccupantsUsingWashrooms'].getValue(),
              numVisitsToWashroomPerOccupant: demandObj['hygiene.numVisitsToWashroomPerOccupant'].getValue()
            },
            kitchen: {
              quantityOfMealsPerDay: demandObj['kitchen.quantityOfMealsPerDay'].getValue(),
              waterUsedPerMeal: demandObj['kitchen.waterUsedPerMeal'].getValue(),
              dishwashingWaterPerLoad: demandObj['kitchen.dishwashingWaterPerLoad'].getValue(),
              loadsOfDishesPerDay: demandObj['kitchen.loadsOfDishesPerDay'].getValue(),
              waterConsumptionPerMeal: demandObj['kitchen.waterConsumptionPerMeal'].getValue()
            },
            laundry: {
              personsUsingLaundry: demandObj['laundry.personsUsingLaundry'].getValue(),
              loadsPerWeekPerPerson: demandObj['laundry.loadsPerWeekPerPerson'].getValue(),
              waterConsumptionPerLoad: demandObj['laundry.waterConsumptionPerLoad'].getValue()
            },
            drinking: {
              personsDrinkingWaterOnSite: demandObj['drinking.personsDrinkingWaterOnSite'].getValue(),
              avgQuantityOfDrink: demandObj['drinking.avgQuantityOfDrink'].getValue(),
              avgDrinksPerDayPerPerson: demandObj['drinking.avgDrinksPerDayPerPerson'].getValue()
            },
            landscape: {
              // avgFlowRate is per minute
              irrigation: {
                hoursPerWeek: demandObj['landscape.irrigation.hoursPerWeek'].getValue(),
                avgFlowRate: demandObj['landscape.irrigation.avgFlowRate'].getValue()
              },
              potsPools: {
                litersPerLocation: demandObj['landscape.potsPools.litersPerLocation'].getValue(),
                numPlantsPools: demandObj['landscape.potsPools.numPlantsPools'].getValue()
              }
            },
            surfaceCleaning: {
              freqOfInteriorSurfaceCleaning: demandObj['surfaceCleaning.freqOfInteriorSurfaceCleaning'].getValue(),
              quantityOfWaterUsedForSC: demandObj['surfaceCleaning.quantityOfWaterUsedForSC'].getValue(),
              numTimesVehicleCleaned: demandObj['surfaceCleaning.numTimesVehicleCleaned'].getValue(),
              quantityOfWaterUsedForVC: demandObj['surfaceCleaning.quantityOfWaterUsedForVC'].getValue()
            },
            evaporativeCooling: {
              hoursPerDayDuringHotSeason: demandObj['evaporativeCooling.hoursPerDayDuringHotSeason'].getValue(),
              litersConsumedPerHour: demandObj['evaporativeCooling.litersConsumedPerHour'].getValue()
            },
            waterCustomers: {
              excessCapacityPerDay: demandObj['waterCustomers.excessCapacityPerDay'].getValue(),
              percentageOfExcessDistributed: demandObj['waterCustomers.percentageOfExcessDistributed'].getValue()
            }
          }
        }
      }
    }
    this.props.saveValues(data)
    this.props.nextSection()
  }
  render () {
    const { toilets, showers } = this.state
    return (
      <div>
        <h3>Water Workbook</h3>
        <LandcoverPreCalc ref='landCoverPreCalc'/>
        <WaterDemandJunctions ref='demandJunctions' toilets={toilets} showers={showers}
          addShower={this.addShower}
          removeShower={this.removeShower}
          addToilet={this.addToilet}
          removeToilet={this.removeToilet}/>
        <Col sm={6}>
          <Button bsStyle='info' onClick={this.props.prevSection}>
            <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle='success' onClick={this.nextSection}>
            Next Section <span className='glyphicon glyphicon-circle-arrow-right'></span>
          </Button>
        </Col>
      </div>
    )
  }
  componentDidMount () {}
}

export default UMISWaterWorkbook
