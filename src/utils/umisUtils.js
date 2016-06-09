import _ from 'lodash'
// let countProperties = function (obj) {
//   let count = 0
//   for (var prop in obj) {
//     if (obj.hasOwnProperty(prop)) ++count
//   }
//   return count
// }

let UMIS = {}
UMIS.DEFAULTS = {}
UMIS.Calculations = {}

UMIS.Calculations.effectiveOccupancyByAge = function (parcel, ageType) {
  var total = 0
  _.each(parcel.demographics[ageType], function (value, key) {
    if (key === 'livingWorking') {
      total += value
    } else {
      total += (value * 0.5)
    }
  })
  return total
}

UMIS.Calculations.totalEffectiveOccupancy = function (parcel) {
  var total = 0
  var ageTypes = ['seniors', 'adults', 'youth']
  ageTypes.forEach(function (ageType) {
    total += parseFloat(UMIS.Calculations.effectiveOccupancyByAge(parcel, ageType))
  })
  return total
}

UMIS.Energy = {}
UMIS.Mobility = {}

// THIS IS MATERIALS AUDIT
UMIS.Materials = {}
UMIS.Materials.totalConsumption = {}
UMIS.Materials.totalConsumption.paper = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight *
    (workbook.data.paper / 100)
  }
  return
}
UMIS.Materials.totalConsumption.organics = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.organics / 100)
  }
  return
}
UMIS.Materials.totalConsumption.plastics = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.plastics / 100)
  }
  return
}
UMIS.Materials.totalConsumption.textiles = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.textiles / 100)
  }
  return
}
UMIS.Materials.totalConsumption.metals = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.metal / 100)
  }
  return
}
UMIS.Materials.totalConsumption.glass = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.glass / 100)
  }
  return
}
UMIS.Materials.totalConsumption.trimmings = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.trimmings / 100)
  }
  return
}
UMIS.Materials.totalConsumption.appliances = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.appliances / 100)
  }
  return
}
UMIS.Materials.totalConsumption.hazardousWaste = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.hazardousWaste / 100)
  }
  return
}
UMIS.Materials.totalConsumption.inertsAndOthers = function (workbook) {
  if (workbook.option === 'A') {
    return workbook.data.totalWeight * (workbook.data.inertsAndOthers / 100)
  }
  return
}

UMIS.Water = {}
UMIS.Water.totalConsumption = {}

// Toilets
UMIS.Water.averageFlush = function (workbook) {
  let toilets = workbook.data.demandJunctions.toilets.activeToilets
  var totalFlushVolume = 0
  toilets.forEach(function (obj) {
    totalFlushVolume += obj.flushVolume
  })
  return totalFlushVolume / toilets.length
}
UMIS.Water.totalConsumption.toilets = function (workbook, parcel) {
  return UMIS.Water.averageFlush(workbook) * UMIS.Calculations.totalEffectiveOccupancy(parcel) *
    workbook.data.demandJunctions.toilets.dailyPerPersonUsage
}

// Hygiene
UMIS.Water.totalConsumption.hygiene = function (workbook) {
  var obj = workbook.data.demandJunctions.hygiene
  // Shower consumption + bath consumption + ablution
  return (UMIS.Water.totalConsumption.hygiene.avgShowerConsumption(workbook) * obj.typicalShowerDuration *
            obj.weeklyShowersPerPerson) +
            (UMIS.Water.totalConsumption.hygiene.avgBathVolume(workbook) * obj.bathsPerWeek) +
            (obj.minutesOfTapFlowPerVisit * obj.ablutionDuration *
            obj.numOccupantsUsingWashrooms * obj.numVisitsToWashroomPerOccupant)
}

// I should really just deal with the showers
UMIS.Water.totalConsumption.hygiene.avgShowerConsumption = function (workbook) {
  let showers = workbook.data.demandJunctions.hygiene.activeShowers
  let totalFlow = 0
  showers.forEach(function (shower) {
    totalFlow += shower.flowVolume
  })
  return totalFlow / showers.length
}
UMIS.Water.totalConsumption.hygiene.avgBathVolume = function (workbook) {
  let baths = workbook.data.demandJunctions.hygiene.activeBaths
  let totalVolume = 0
  baths.forEach(function (bath) {
    totalVolume += bath.volume
  })
  return totalVolume / baths.length
}

UMIS.Water.totalConsumption.kitchen = function (workbook) {
  var obj = workbook.data.demandJunctions.kitchen
  return parseFloat(obj.quantityOfMealsPerDay * obj.waterUsedPerMeal +
    obj.dishwashingWaterPerLoad * obj.loadsOfDishesPerDay +
    obj.waterConsumptionPerMeal)
}

UMIS.Water.totalConsumption.laundry = function (workbook) {
  var obj = workbook.data.demandJunctions.laundry
  return (obj.personsUsingLaundry * obj.loadsPerWeekPerPerson *
            obj.waterConsumptionPerLoad) / 7
}

UMIS.Water.totalConsumption.drinking = function (workbook) {
  var obj = workbook.data.demandJunctions.drinking
  return (obj.personsDrinkingWaterOnSite * obj.avgQuantityOfDrink *
            obj.avgDrinksPerDayPerPerson)
}

// UMIS.Water.totalConsumption.landscape = function (workbook, parcel) {
//   var functions = UMIS.Water.totalConsumption.landscape
//   return functions.unmediatedRainfall(workbook, parcel) + functions.totalIrrigation(workbook) +
//     functions.totalPotsPools(workbook)
// }

UMIS.Water.runOffLitersPerDay = function (workbook) {
  return UMIS.Water.unmediatedRainfall(workbook) *
          UMIS.Water.totalAveragePermeability
}

UMIS.Water.infiltrationPerDay = function (workbook) {
  return UMIS.Water.unmediatedRainfall(workbook) *
    (1 - UMIS.Water.totalAveragePermeability)
}

UMIS.Water.unmediatedRainfall = function (workbook, parcel) {
  var obj1 = workbook.data.demandJunctions.landscape
  return (obj1.weather.seasonTotal / obj1.weather.seasonLength) *
            parcel.describeParcel.landArea *
            workbook.data.landCoverPreCalculation.percentageOfParcelWithRainwaterCatchment
}

// UMIS.Water.totalConsumption.landscape.totalPotsPools = function (workbook) {
//   var obj = workbook.data.demandJunctions.landscape.potsPools
//   return (obj.litersPerLocation + obj.numPlantsPools) / 7
// }
//
// UMIS.Water.totalConsumption.landscape.totalIrrigation = function (workbook) {
//   var obj = workbook.data.demandJunctions.landscape.irrigation
//   return (obj.hoursPerWeek * obj.avgFlowRate) * 60 / 7
// }

UMIS.Water.totalConsumption.surfaceCleaning = function (workbook) {
  var obj = workbook.data.demandJunctions.surfaceCleaning
  return (obj.freqOfInteriorSurfaceCleaning * obj.quantityOfWaterUsedForSC +
            obj.numTimesVehicleCleaned * obj.quantityOfWaterUsedForVC)
}

UMIS.Water.totalConsumption.evaporativeCooling = function (workbook) {
  var obj = workbook.data.demandJunctions.evaporativeCooling
  return (obj.hoursPerDayDuringHotSeason * obj.litersConsumedPerHour)
}

UMIS.Water.totalConsumption.waterCustomers = function (workbook) {
  var obj = workbook.data.demandJunctions.waterCustomers
  // Why is this multiplied by 1000
  return (obj.excessCapacityPerDay * obj.percentageOfExcessDistributed) * 1000
}

// THIS is what I am Working on
UMIS.Water.averagePermeability = function (workbook, surfaceType) {
  return workbook.data.landCoverPreCalculation
                 .surfaceTypes[surfaceType]
                 .effectivePermeability *
          workbook.data
                  .landCoverPreCalculation
                  .surfaceTypes[surfaceType]
                  .portionParcel
}

UMIS.Water.totalAveragePermeability = function (workbook) {
  var total = 0
  workbook.data.landCoverPreCalculation.surfaceTypes.forEach(function (surfaceType) {
    total += UMIS.Water.averagePermeability(workbook, surfaceType)
  })
  return total
}

var totalConsumption = {
  water: function (workbook, parcel) {
    var result = {}
    result.Toilets = UMIS.Water.totalConsumption.toilets(workbook, parcel)
    result.Hygiene = UMIS.Water.totalConsumption.hygiene(workbook)
    result.Kitchen = UMIS.Water.totalConsumption.kitchen(workbook)
    result.Laundry = UMIS.Water.totalConsumption.laundry(workbook)
    result.Drinking = UMIS.Water.totalConsumption.drinking(workbook)
    // result['Landscape'] = UMIS.Water.totalConsumption.landscape(workbook, parcel)
    result['Surface Cleaning'] = UMIS.Water.totalConsumption.surfaceCleaning(workbook)
    result['Evaporative Cooling'] = UMIS.Water.totalConsumption.evaporativeCooling(workbook)
    result['Water Customers'] = UMIS.Water.totalConsumption.waterCustomers(workbook)
    return result
  },
  materials: function (workbook) {
    var result = {}
    result.Paper = UMIS.Materials.totalConsumption.paper(workbook)
    result.Organics = UMIS.Materials.totalConsumption.organics(workbook)
    result.Plastics = UMIS.Materials.totalConsumption.plastics(workbook)
    result.Textiles = UMIS.Materials.totalConsumption.textiles(workbook)
    result.Metals = UMIS.Materials.totalConsumption.metals(workbook)
    result.Glass = UMIS.Materials.totalConsumption.glass(workbook)
    result.Trimmings = UMIS.Materials.totalConsumption.trimmings(workbook)
    result.Appliances = UMIS.Materials.totalConsumption.appliances(workbook)
    result['Hazardous Waste'] = UMIS.Materials.totalConsumption.hazardousWaste(workbook)
    result['Inerts and Others'] = UMIS.Materials.totalConsumption.inertsAndOthers(workbook)
    return result
  }
}
// parcel.properties
const calculateTotals = function (parcel) {
  parcel.properties.totalDemand = {}
  _.forEach(totalConsumption, function (resourceCalcFunction, resource) {
    if (typeof parcel.properties.workbooks !== 'undefined' && parcel.properties.workbooks[resource] !== 'undefined') {
      parcel.properties.totalDemand[resource] =
        resourceCalcFunction(parcel.properties.workbooks[resource], parcel.properties)
    }
  })
  return parcel
}

export default calculateTotals
