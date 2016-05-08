import React, { PropTypes } from 'react'
import { Button, Col } from 'react-bootstrap'
import LandcoverPreCalc from './LandcoverPreCalc'
import WaterDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func,
  saveValues: PropTypes.func
}
class UMISWaterWorkbook extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextSection = this.nextSection.bind(this)
  }
  nextSection (e) {
    e.preventDefault()
    // write a data generation function that checks for the refs presence and then will update the datastore
    let data = {
      water: {
        landCoverPreCalc: {

        },
        demandJunctions: {
          toilets: {
            activeToilets: [{}],
            numPersonsUsingToilets: 'number',
            dailyPerPersonUsage: ''
          },
          hygiene: {
            activeShowers: [{}],
            typicalShowerDuration: '',
            weeklyShowersPerPerson: '',
            bathVolume: '',
            bathsPerWeek: '',
            minutesOfTapFlowPerVisit: '',
            ablutionDuration: '',
            numOccupantsUsingWashrooms: '',
            numVisitsToWashroomPerOccupant: ''
          },
          kitchen: {
            quantityOfMealsPerDay: '',
            waterUsedPerMeal: '',
            dishwashingWaterPerLoad: '',
            loadsOfDishesPerDay: '',
            waterConsumptionPerMeal: ''
          },
          laundry: {
            personsUsingLaundry: '',
            loadsPerWeekPerPerson: '',
            waterConsumptionPerLoad: ''
          },
          drinking: {
            personsDrinkingWaterOnSite: '',
            avgQuantityOfDrink: '',
            avgDrinksPerDayPerPerson: ''
          },
          landscape: {
            irrigation: {
              hoursPerWeek: ''
            },
            potsPools: {
              litersPerLocation: '',
              numPlantsPools: ''
            }
          },
          surfaceCleaning: {
            freqOfInteriorSurfaceCleaning: '',
            quantityOfWaterUsedForSC: '',
            numTimesVehicleCleaned: '',
            quantityOfWaterUsedForVC: ''
          },
          evaporativeCooling: {
            hoursPerDayDuringHotSeason: '',
            litersConsumedPerHour: ''
          },
          waterCustomers: {
            excessCapacityPerDay: '',
            percentageOfExcessDistributed: ''
          }
        }
      }
    }
    this.props.saveValues(data)
    this.props.nextSection()
  }
  render () {
    return (
      <div>
        <h3>Water Workbook</h3>
        <LandcoverPreCalc ref='landCoverPreCalc'/>
        <WaterDemandJunctions ref='demandJunctions'/>
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
