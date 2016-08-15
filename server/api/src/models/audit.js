/**
  Schema for Audit
*/
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AuditSchema = new Schema({
  'type': { type: String, default: 'Feature' },
  'geometry': {
    'type': { type: String, default: 'Polygon' },
    'coordinates': { type: Array, default: [0, 0] }
  },
  properties: {
    sourceInformation: {
      author: String,
      date: { type: Date, default: Date.now },
      neighborhoodID: Number,
      timeHorizon: Number
    },
    parcelIdentification: {
      'parcelType': { type: String, default: 'Generic Parcel' },
      'designatedLandUse': { type: String, default: 'Residential' },
      'actualLandUse': { type: String, default: 'Residential' },
      'landArea': { type: Number, default: 0 },
      'buildingFootprint': { type: Number, default: 0 }
    },
    buildingData: {
      'buildingAttachmentType': { type: String, default: 'Single Family' },
      'numberOccupiedDwellingUnits': { type: Number, default: 0 },
      'buildingAge': { type: Number, default: 0 },
      'aboveGroundStories': { type: Number, default: 0 },
      'belowGroundStories': { type: Number, default: 0 },
      'interiorFloorSpace': { type: Number, default: 0 },
      'separateDwellingUnits': { type: Number, default: 0 },
      'foundationType': { type: String, default: 'Slab-on-Grade' },
      'wallType': { type: String, default: 'Solid Masonry' },
      'roofType': { type: String, default: 'Peaked Hard Surface' }
    },
    demographics: {
      'seniors': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      },
      'adults': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      },
      'youth': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      }
    },
    workbooks: {
      water: {
        data: {
          landCoverPreCalc: {},
          demandJunctions: {}
        }
      },
      materials: {
        option: { type: String },
        data: {}
      }
    },
    totalDemand: {}
  }

})
// let energyWorkbook = {
//   data : {
//     lighting : {
//       // Multiple bulbs can be added.
//       //The following bulbs need options
//       // Standard incandescent bulbs
//       // Compact fluorescent bulbs
//       // Fluorescent ballasts
//       // Other bulbs
//       bulbType : {
//         hoursUsed: number,
//         numUnits: number,
//         typicalWattage: number
//       }
//     },
//     appliances : {
//       phantomPowerRatio: number,
//       // Multiple Appliances can be added.
//       // Appliances use the following options
//       // Television
//       // Charge iPod/MP3 player
//       // Charge hand-held video games
//       // Video game console
//       // DVD or VHS player
//       // Desktop computer
//       // Charge a laptop computer
//       // Charge a cell phone
//       // Charge a cordless telephone
//       // Hair dryer
//       // Curling/ straightening iron
//       // Cook on the electric stove top
//       // Bake in an electric oven
//       // Gas stove top
//       // Gas oven
//       // Microwave
//       // Electric kettle
//       // Food processor
//       // Toaster
//       // Refrigerator
//       // Use dishwasher
//       // Water pump
//       // Deep freezer
//       // Automatic washing machine
//       // Semi-automatic washing machine
//       // Clothes dryer
//       // Iron clothing
//       // Vacuum
//       appliance : {
//         hoursUsed: number,
//         numUnits: number,
//         typicalWattage: number
//       }
//     },
//
//     spaceHeating : {
//       // Multiple fuelTypes can be added.
//       // The following fuelTypes need options
//       // Gas
//       // Propane
//       // Electricity
//       // Oil
//       // Hardwood
//       // Softwood
//       fuelType : {
//         annualHeatingBill: number,
//         systemType: number,
//         fuelPrice: number,
//       }
//     },
//     ventilationAC: {
//       // Multiple Appliances can be added.
//       // Floor fan
//       // Standard ceiling fan
//       // Kitchen exhaust fan
//       // Bathroom exhaust fan
//       // Air conditioner window unit
//       // Central air conditioning unit
//       // Split air conditioner
//       appliance: {
//         hoursUsed: number,
//         numUnits: number,
//         typicalWattage: number
//       }
//     },
//     waterHeating: {
//       activities: {
//         shower: number,
//         laundryMachine: number,
//         dishwasher: number,
//         kitchenFaucetFlow: number,
//         bathroomFaucetFlow: number
//       }
//       heaters: {
//         // They will have the ability to add multiple heaters
//         heater: {
//           // Gas and Electric are the two types.
//           type: 'gas'
//           numUnits: number
//         }
//       }
//     },
//     groundRailTransport: {
//       days: {
//         // 7 days would exist total since this is made for a week.
//         day: {
//           // miles Traveled
//           transportationType: number
//         }
//       }
//     },
//     airTransport: {
//       milesTravelledPerYear: number
//     }
//   }
// }

// let foodWorkbook = {
//   data: {
//     fruitsAndVegetables: {
//       // Weekly
//       bagsPurchased: Number,
//       avgWeightPerBag: Number,
//       harvestSeasonBaskets: Number,
//       avgWeightPerBasket: Number,
//       percentageOfYearGardenProduces: Number
//     },
//     dairy: {
//       // Weekly
//       ltsLiquidDairy: Number,
//       kgsSolidDairy: Number
//     },
//     beverages: {
//       regBottlesConsumed: Number,
//       regBottleSize: Number,
//       lgBottleConsumed: Number,
//       lgBottleSize: Number,
//       homemadeJuicePerDay: Number
//     },
//     edibleOils: {
//       numPersonsEatingFoodCookedOnsite: Number,
//       kgPerWeekOilPerPerson: Number
//     },
//     grainsBeansLegumes: {
//       // Breakfast
//       // Lunch
//       // Dinner
//       meals: {
//         breakfast: {
//           rice: Number,
//           wheat: Number,
//           corn: Number,
//           noodles: Number,
//           bread: Number,
//           numPersonPerMeal: Number
//         }
//       },
//       avgKGDryGrainPerServing: Number
//     },
//     meatsAndEggs: {
//       // Breakfast
//       // Lunch
//       // Dinner
//       meals: {
//         breakfast: {
//           chicken: Number,
//           beef: Number,
//           pork: Number,
//           lamb: Number,
//           otherMeats: Number,
//           numPersonPerMeal: Number
//         }
//       },
//       avgKGMeatandEggsPerServing: Number
//     },
//     fishShellfishAlgae: {
//       purchased: Number,
//       harvested: Number,
//       percentageOfYearHarvested: Number
//     },
//     stimulants: {
//       kgCoffeeTea: Number,
//       ltsAlcoholicBeverages: Number
//     },
//     sugarAndSweets: {
//       kgSugar: Number,
//       ltsSyrupHoneyMalt: Number,
//       kgCandyPastries: Number
//     }
//   }
// }

mongoose.model('Audit', AuditSchema)
