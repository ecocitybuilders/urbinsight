import _ from 'lodash'

let UMIS = {}

UMIS.Calculations = {
  effectiveOccupancyByAge: function (parcel, ageType) {
    var total = 0
    _.each(parcel.demographics[ageType], function (value, key) {
      if (key === 'livingWorking') {
        total += value
      } else {
        total += (value * 0.5)
      }
    })
    return total
  },
  totalEffectiveOccupancy: function (parcel) {
    var total = 0
    var ageTypes = ['seniors', 'adults', 'youth']
    ageTypes.forEach(function (ageType) {
      total += parseFloat(UMIS.Calculations.effectiveOccupancyByAge(parcel, ageType))
    })
    return total
  }
}

// If you want to create calculated values that could be updated based on changing
// assumptions these values would have to be used to calculate based on the examples in
// the mobility UMIS

let mobilityDefaults = {
  foot: {
    walking: {
      caloriesPerKM: 52.50,
      numOfPass: 1
    },
    running: {
      caloriesPerKM: 68.75,
      numOfPass: 1
    }
  },
  humanPowered: {
    bicycle: {
      caloriesPerKM: 15.24,
      numOfPass: 1
    },
    pulledRickshaw: {
      caloriesPerKM: 72.54,
      numOfPass: 3
    }
  },
  motorizedVehicle: {
    motorcycle: {
      ltsPerKM: 12.8,
      numOfPass: 2
    },
    autoRickshaw: {
      ltsPerKM: 22.0,
      numOfPass: 3
    },
    car4pass: {
      ltsPerKM: 17.9,
      numOfPass: 4
    },
    car2pass: {
      ltsPerKM: 17.9,
      numOfPass: 2
    },
    car1pass: {
      ltsPerKM: 17.9,
      numOfPass: 1
    },
    personalLightTruck: {
      ltsPerKM: 10.2,
      numOfPass: 1
    }
  },
  bus: {
    conventionalBus: {
      ltsPerKM: 1.8,
      numOfPass: 40
    },
    hybridElectricBus: {
      ltsPerKM: 2.4,
      numOfPass: 40
    }
  },
  train: {
    commuterRail: {
      ltsPerKM: 9.8,
      numOfPass: 100
    },
    intercityRail: {
      ltsPerKM: 5.1,
      numOfPass: 100
    }
  },
  subway: {
    subway: {
      ltsPerKM: 0.00,
      numOfPass: 'NA'
    }
  },
  tram: {
    tram: {
      ltsPerKM: 0.01,
      numOfPass: 'NA'
    }
  },
  ferry: {
    ferry: {
      ltsPerKM: 9.44,
      numOfPass: 401
    }
  }
}

UMIS.Mobility = {
  defaults: {
    foot: {
      walking: {
        ltsPerPassKM: 0.0000063,
        MJPerPassKM: 0.00021966
        // ltsPerPassKM: this.MJPerPassKM / 34.8707109,
        // MJPerPassKM: mobilityDefaults.foot.walking.caloriesPerKM / 239005.736,
        // ltsPerKM: ltsPerPassKM * mobilityDefaults.foot.walking.numOfPass
      },
      running: {
        ltsPerPassKM: 0.00000825,
        MJPerPassKM: 0.00028765
      }
    },
    humanPowered: {
      bicycle: {
        ltsPerPassKM: 0.00000183,
        MJPerPassKM: 0.00006376
      },
      pulledRickshaw: {
        ltsPerPassKM: 0.0000087,
        MJPerPassKM: 0.00030351
      }
    },
    motorizedVehicle: {
      motorcycle: {
        ltsPerPassKM: 0.03920243,
        MJPerPassKM: 1.36701662
      },
      autoRickshaw: {
        ltsPerPassKM: 0.01515152,
        MJPerPassKM: 0.52834410
      },
      car4pass: {
        ltsPerPassKM: 0.01400087,
        MJPerPassKM: 0.48822022
      },
      car2pass: {
        ltsPerPassKM: 0.02800174,
        MJPerPassKM: 0.97644045
      },
      car1pass: {
        ltsPerPassKM: 0.05600347,
        MJPerPassKM: 1.95288089
      },
      personalLightTruck: {
        ltsPerPassKM: 0.09800608,
        MJPerPassKM: 3.41754155
      }
    },
    bus: {
      conventionalBus: {
        ltsPerPassKM: 0.01400087,
        MJPerPassKM: 0.48822022
      },
      hybridElectricBus: {
        ltsPerPassKM: 0.01050065,
        MJPerPassKM: 0.36616517
      }
    },
    train: {
      commuterRail: {
        ltsPerPassKM: 0.00102267,
        MJPerPassKM: 0.03566130
      },
      intercityRail: {
        ltsPerPassKM: 0.00196012,
        MJPerPassKM: 0.06835083
      }
    },
    subway: {
      subway: {
        ltsPerPassKM: 0.00445482,
        MJPerPassKM: 0.15534280
      }
    },
    tram: {
      tram: {
        ltsPerPassKM: 0.00708478,
        MJPerPassKM: 0.24705120
      }
    },
    ferry: {
      ferry: {
        ltsPerPassKM: 0.02352146,
        MJPerPassKM: 0.82020997
      }
    }
  }
}

UMIS.Food = {
  totalConsumption: {
    fruitsAndVegetables: function (workbook) {
      let data = workbook.data.fruitsAndVegetables
      return data.bagsPurchasedWeekly * data.avgWeightPerBag +
        data.harvestSeasonBasketsWeekly * data.avgWeightPerBasket * data.percentageOfYearGardenProduces
    },
    dairy: function (workbook) {
      let data = workbook.data.dairy
      return data.ltsLiquidDairy + data.kgsCheeseButter
    },
    beverages: function (workbook) {
      let data = workbook.data.beverages
      return ((data.regBottlesConsumed * data.regBottleSize) / 1000) +
        ((data.lgBottleConsumed * data.lgBottleSize) / 1000) +
        (data.homemadeJuicePerDay * 0.25)
    },
    // This is a bad calculation
    edibleOils: function (workbook) {
      let data = workbook.data.edibleOils
      return data.numPersonsEatingFoodCookedOnsite * data.kgPerWeekOilPerPerson
    },
    grainsBeansLegumes: function (workbook) {
      let data = workbook.data.grainsBeansLegumes
      let total = 0
      _.forEach(data.meals, (mealType) => {
        let subTotal = 0
        _.forEach(mealType, (value, grain) => {
          if (grain !== 'numPersonPerMeal') {
            subTotal += value
          }
        })
        total += subTotal * mealType.numPersonPerMeal
      })
      return total * data.avgKGDryGrainPerServing
    },
    meatsAndEggs: function (workbook) {
      let data = workbook.data.meatsAndEggs
      let total = 0
      _.forEach(data.meals, (mealType) => {
        let subTotal = 0
        _.forEach(mealType, (value, meat) => {
          if (meat !== 'numPersonPerMeal') {
            subTotal += value
          }
        })
        total += subTotal * mealType.numPersonPerMeal
      })
      return total * data.avgKGMeatandEggsPerServing
    },
    fishShellfishAlgae: function (workbook) {
      let data = workbook.data.fishShellfishAlgae
      return data.purchased + data.harvested * data.percentageOfYearHarvested
    },
    stimulants: function (workbook) {
      let data = workbook.data.stimulants
      return data.kgCoffeeTea + data.ltsAlcoholicBeverages
    },
    sugarAndSweets: function (workbook) {
      let data = workbook.data.sugarAndSweets
      return data.kgSugar + data.ltsSyrupHoneyMalt + data.kgCandyPastries
    }
  }
}

UMIS.Energy = {
  defaults: {
    megaJoulesConversion: 3.6,
    spaceHeating: {
      energyContent: {
        // MJ/m3
        gas: 37.5,
        // MJ/L
        propane: 25.3,
        // MJ/kWh
        electricity: 3.6,
        // MJ/L
        oil: 38.2,
        // MJ/cord
        hardwood: 30600,
        // MJ/cord
        softwood: 18700
      },
      seasonalEfficiency: {
        gas: {
          conventional: 60,
          ventDamper: 64.5,
          midEfficiency: 81,
          highEfficiency: 93,
          intergratedWaterCondensing: 92.5
        },
        propane: {
          conventional: 62,
          ventDamper: 66.5,
          midEfficiency: 82,
          condensing: 90.5
        },
        electricity: {
          electricBaseboard: 100,
          electricFurnace: 100
        },
        oil: {
          castIronHeadBurner: 60,
          flameRetentionBurner: 74,
          highStaticReplacementBurner: 78,
          newStandardModel: 82,
          midEfficiency: 86
        },
        hardwood: {
          centralFurnance: 50,
          conventionalStove: 62.5,
          highTechStove: 75,
          combustionFireplace: 60,
          pelletStove: 67.5
        },
        softwood: {
          centralFurnance: 50,
          conventionalStove: 62.5,
          highTechStove: 75,
          combustionFireplace: 60,
          pelletStove: 67.5
        }
      }
    },
    waterHeating: {
      activityAverages: {
        shower: 10,
        laundryMachine: 7,
        dishwasher: 6,
        kitchenFaucetFlow: 0.5,
        bathroomFaucetFlow: 2
      },
      energyFactors: {
        gas: 0.61,
        electric: 0.92
      }
    },
    groundRailTransport: {
      transportationTypes: {
        conventionalBus: {
          milesPerGallon: 4.2,
          numPassengers: 40,
          gallonsPerPassMile: 0.006,
          mjPerPassMile: 0.79
        },
        hybridElectricBus: {
          milesPerGallon: 5.6,
          numPassengers: 40,
          gallonsPerPassMile: 0.004,
          mjPerPassMile: 0.59
        },
        motorcycle: {
          milesPerGallon: 30,
          numPassengers: 2,
          gallonsPerPassMile: 0.017,
          mjPerPassMile: 2.2
        },
        personalLightTruck: {
          milesPerGallon: 24,
          numPassengers: 1,
          gallonsPerPassMile: 0.042,
          mjPerPassMile: 5.5
        },
        car4pass: {
          milesPerGallon: 42,
          numPassengers: 4,
          gallonsPerPassMile: 0.006,
          mjPerPassMile: 0.79
        },
        car2pass: {
          milesPerGallon: 42,
          numPassengers: 2,
          gallonsPerPassMile: 0.012,
          mjPerPassMile: 1.57
        },
        car1pass: {
          milesPerGallon: 42,
          numPassengers: 1,
          gallonsPerPassMile: 0.024,
          mjPerPassMile: 3.14
        },
        commuterRail: {
          milesPerGallon: 23,
          numPassengers: 100,
          gallonsPerPassMile: 0.000,
          mjPerPassMile: 0.06
        },
        intercityRail: {
          milesPerGallon: 12,
          numPassengers: 100,
          gallonsPerPassMile: 0.001,
          mjPerPassMile: 0.11
        }
      }
    },
    airTransport: {
      mjPerPassMile: 3.862426795
    }
  },
  totalConsumption: {
    lighting: function (workbook) {
      let total = 0
      _.forEach(workbook.data.lighting, (bulbType) => {
        total += ((bulbType.hoursUsed * bulbType.numUnits * bulbType.typicalWattage) / 1000) *
          UMIS.Energy.defaults.megaJoulesConversion
      })
      return total
    },
    appliances: function (workbook) {
      let total = 0
      _.forEach(workbook.data.appliances, (appliance) => {
        total += ((appliance.hoursUsed * appliance.numUnits * appliance.typicalWattage) / 1000) *
          UMIS.Energy.defaults.megaJoulesConversion
      })
      total += total * workbook.data.appliances.phantomPowerRatio
      return total
    },
    spaceHeating: function (workbook) {
      let total = 0
      _.forEach(workbook.data.spaceHeating, (fuelType, fuelTypeName) => {
        total += ((fuelType.annualHeatingBill / 100) *
          (UMIS.Energy.defaults.spaceHeating.seasonalEfficiency[fuelTypeName][fuelType.systemType] / fuelType.price)) *
          (UMIS.Energy.defaults.spaceHeating.energyContent[fuelTypeName] / 365.242)
      })
      return total
    },
    ventilationAC: function (workbook) {
      let total = 0
      _.forEach(workbook.data.ventilationAC, (appliance) => {
        total += ((appliance.hoursUsed * appliance.numUnits * appliance.typicalWattage) / 1000) *
          UMIS.Energy.defaults.megaJoulesConversion
      })
      return total
    },
    waterHeating: function (workbook) {
      let total = 0
      let totalGallonsUsed = 0
      _.forEach(workbook.data.waterHeating.activities, (timesPerDay, name) => {
        totalGallonsUsed += timesPerDay * UMIS.Energy.defaults.waterHeating.activityAverages[name]
      })
      _.forEach(workbook.data.waterHeating.heaters, (heater) => {
        total += ((totalGallonsUsed * 8.33 * (135 - 58)) /
          UMIS.Energy.defaults.waterHeating.energyFactors[heater.type]) * 0.00105505585
      })
      return total
    },
    groundRailTransport: function (workbook) {
      let total = 0
      _.forEach(workbook.data.groundRailTransport.days, (day) => {
        _.forEach(day, (milesTravelled, transportationType) => {
          total += milesTravelled *
            UMIS.Energy.defaults.groundRailTransport.transportationTypes[transportationType].mjPerPassMile
        })
      })
      return total / 7
    },
    airTransport: function (workbook) {
      return workbook.data.airTransport.milesTravelledPerYear *
        UMIS.Energy.defaults.airTransport.mjPerPassMile / 365.242
    }
  }
}

UMIS.Materials = {
  totalConsumption: {
    paper: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight *
        (workbook.data.paper / 100)
      }
      return
    },
    organics: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.organics / 100)
      }
      return
    },
    plastics: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.plastics / 100)
      }
      return
    },
    textiles: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.textiles / 100)
      }
      return
    },
    metals: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.metal / 100)
      }
      return
    },
    glass: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.glass / 100)
      }
      return
    },
    trimmings: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.trimmings / 100)
      }
      return
    },
    appliances: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.appliances / 100)
      }
      return
    },
    hazardousWaste: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.hazardousWaste / 100)
      }
      return
    },
    inertsAndOthers: function (workbook) {
      if (workbook.option === 'A') {
        return workbook.data.totalWeight * (workbook.data.inertsAndOthers / 100)
      }
      return
    }
  }
}

UMIS.Water = {
  totalConsumption: {
    toilets: function (workbook, parcel) {
      return UMIS.Water.averageFlush(workbook) * UMIS.Calculations.totalEffectiveOccupancy(parcel) *
        workbook.data.demandJunctions.toilets.dailyPerPersonUsage
    },
    hygiene: function (workbook) {
      var obj = workbook.data.demandJunctions.hygiene
      // Shower consumption + bath consumption + ablution
      return (UMIS.Water.avgShowerConsumption(workbook) * obj.typicalShowerDuration *
                obj.weeklyShowersPerPerson) +
                (UMIS.Water.avgBathVolume(workbook) * obj.bathsPerWeek) +
                (obj.minutesOfTapFlowPerVisit * obj.ablutionDuration *
                obj.numOccupantsUsingWashrooms * obj.numVisitsToWashroomPerOccupant)
    },
    kitchen: function (workbook) {
      var obj = workbook.data.demandJunctions.kitchen
      return parseFloat(obj.quantityOfMealsPerDay * obj.waterUsedPerMeal +
        obj.dishwashingWaterPerLoad * obj.loadsOfDishesPerDay +
        obj.waterConsumptionPerMeal)
    },
    laundry: function (workbook) {
      var obj = workbook.data.demandJunctions.laundry
      return (obj.personsUsingLaundry * obj.loadsPerWeekPerPerson *
                obj.waterConsumptionPerLoad) / 7
    },
    drinking: function (workbook) {
      var obj = workbook.data.demandJunctions.drinking
      return (obj.personsDrinkingWaterOnSite * obj.avgQuantityOfDrink *
                obj.avgDrinksPerDayPerPerson)
    },
    surfaceCleaning: function (workbook) {
      var obj = workbook.data.demandJunctions.surfaceCleaning
      return (obj.freqOfInteriorSurfaceCleaning * obj.quantityOfWaterUsedForSC +
                obj.numTimesVehicleCleaned * obj.quantityOfWaterUsedForVC)
    },
    evaporativeCooling: function (workbook) {
      var obj = workbook.data.demandJunctions.evaporativeCooling
      return (obj.hoursPerDayDuringHotSeason * obj.litersConsumedPerHour)
    },
    waterCustomers: function (workbook) {
      var obj = workbook.data.demandJunctions.waterCustomers
      // Why is this multiplied by 1000
      return (obj.excessCapacityPerDay * obj.percentageOfExcessDistributed) * 1000
    }
  },
  averageFlush: function (workbook) {
    let toilets = workbook.data.demandJunctions.toilets.activeToilets
    var totalFlushVolume = 0
    toilets.forEach(function (obj) {
      totalFlushVolume += obj.flushVolume
    })
    return totalFlushVolume / toilets.length
  },
  averagePermeability: function (workbook, surfaceType) {
    return workbook.data.landCoverPreCalculation
                   .surfaceTypes[surfaceType]
                   .effectivePermeability *
            workbook.data
                    .landCoverPreCalculation
                    .surfaceTypes[surfaceType]
                    .portionParcel
  },
  totalAveragePermeability: function (workbook) {
    var total = 0
    workbook.data.landCoverPreCalculation.surfaceTypes.forEach(function (surfaceType) {
      total += UMIS.Water.averagePermeability(workbook, surfaceType)
    })
    return total
  },
  avgShowerConsumption: function (workbook) {
    let showers = workbook.data.demandJunctions.hygiene.activeShowers
    let totalFlow = 0
    showers.forEach(function (shower) {
      totalFlow += shower.flowVolume
    })
    return totalFlow / showers.length
  },
  avgBathVolume: function (workbook) {
    let baths = workbook.data.demandJunctions.hygiene.activeBaths
    let totalVolume = 0
    baths.forEach(function (bath) {
      totalVolume += bath.volume
    })
    return totalVolume / baths.length
  },
  runOffLitersPerDay: function (workbook, parcel) {
    return UMIS.Water.unmediatedRainfall(workbook, parcel) *
            UMIS.Water.totalAveragePermeability
  },
  infiltrationPerDay: function (workbook, parcel) {
    return UMIS.Water.unmediatedRainfall(workbook, parcel) *
      (1 - UMIS.Water.totalAveragePermeability)
  },
  unmediatedRainfall: function (workbook, parcel) {
    var obj1 = workbook.data.demandJunctions.landscape
    return (obj1.weather.seasonTotal / obj1.weather.seasonLength) *
              parcel.describeParcel.landArea *
              workbook.data.landCoverPreCalculation.percentageOfParcelWithRainwaterCatchment
  }
}
// I should really just deal with the showers

// UMIS.Water.totalConsumption.landscape = function (workbook, parcel) {
//   var functions = UMIS.Water.totalConsumption.landscape
//   return functions.unmediatedRainfall(workbook, parcel) + functions.totalIrrigation(workbook) +
//     functions.totalPotsPools(workbook)
// }
// UMIS.Water.totalConsumption.landscape.totalPotsPools = function (workbook) {
//   var obj = workbook.data.demandJunctions.landscape.potsPools
//   return (obj.litersPerLocation + obj.numPlantsPools) / 7
// }
// UMIS.Water.totalConsumption.landscape.totalIrrigation = function (workbook) {
//   var obj = workbook.data.demandJunctions.landscape.irrigation
//   return (obj.hoursPerWeek * obj.avgFlowRate) * 60 / 7
// }

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
  },
  energy: function (workbook) {
    var result = {}
    result.Lighting = UMIS.Energy.totalConsumption.lighting(workbook)
    result.Appliances = UMIS.Energy.totalConsumption.appliances(workbook)
    result['Space Heating'] = UMIS.Energy.totalConsumption.spaceHeating(workbook)
    result['Ventilation and AC'] = UMIS.Energy.totalConsumption.ventilationAC(workbook)
    result['Water Heating'] = UMIS.Energy.totalConsumption.waterHeating(workbook)
    result['Ground & Rail Transport'] = UMIS.Energy.totalConsumption.groundRailTransport(workbook)
    result['Air Transport'] = UMIS.Energy.totalConsumption.airTransport(workbook)
    return result
  },
  food: function (workbook) {
    var result = {}
    result['Fruits and Vegetables'] = UMIS.Food.totalConsumption.fruitsAndVegetables(workbook)
    result.Dairy = UMIS.Food.totalConsumption.dairy(workbook)
    result.Beverages = UMIS.Food.totalConsumption.beverages(workbook)
    result['Edible Oils'] = UMIS.Food.totalConsumption.edibleOils(workbook)
    result['Grains, Beans, and Legumes'] = UMIS.Food.totalConsumption.grainsBeansLegumes(workbook)
    result['Meats and Eggs'] = UMIS.Food.totalConsumption.meatsAndEggs(workbook)
    result['Fish, Shellfish, Algae'] = UMIS.Food.totalConsumption.fishShellfishAlgae(workbook)
    result['Stimulants'] = UMIS.Food.totalConsumption.stimulants(workbook)
    result['Sugar and Sweets'] = UMIS.Food.totalConsumption.sugarAndSweets(workbook)
    return result
  }
}
// parcel.properties
const calculateTotals = function (parcel) {
  parcel.properties.totalDemand = {}
  _.forEach(totalConsumption, function (resourceCalcFunction, resource) {
    if (typeof parcel.properties.workbooks !== 'undefined' &&
      typeof parcel.properties.workbooks[resource] !== 'undefined') {
      parcel.properties.totalDemand[resource] =
        resourceCalcFunction(parcel.properties.workbooks[resource], parcel.properties)
    }
  })
  return parcel
}

export default calculateTotals
