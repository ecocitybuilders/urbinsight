import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'
import MaterialsWorkbookContainer from './materialsWorkbookContainer'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func,
  saveValues: PropTypes.func
}
let materialsWorkbookCalculator = function (refObj, state) {
  let obj
  switch (state.optionSelected) {
    case 'A':
    // Percentages
      obj = refObj['A'].refs
      return {
        option: 'A',
        data: {
          totalWeight: obj.totalWeight.getValue(),
          paper: obj.paper.getValue(),
          organics: obj.organics.getValue(),
          plastics: obj.plastics.getValue(),
          textiles: obj.textiles.getValue(),
          metal: obj.metal.getValue(),
          glass: obj.glass.getValue(),
          trimmings: obj.trimmings.getValue(),
          appliances: obj.appliances.getValue(),
          hazardousWaste: obj.hazardousWaste.getValue(),
          inertsAndOthers: obj.inertsAndOthers.getValue()
        }
      }
    case 'B':
    // Percentages
      obj = refObj['B'].refs
      return {
        option: 'B',
        data: {
          totalWeight: obj.totalWeight.getValue(),
          paper: {
            usedPaper: obj.usedPaper.getValue(),
            officeSupplies: obj.officeSupplies.getValue(),
            phonebook: obj.phonebook.getValue(),
            newsprint: obj.newsprint.getValue(),
            computerPaper: obj.computerPaper.getValue(),
            corrugatedCardboard: obj.corrugatedCardboard.getValue(),
            mixedWastePaper: obj.mixedWastePaper.getValue(),
            nonRecyclablePaper: obj.nonRecyclablePaper.getValue()
          },
          organics: {
            starches: obj.starches.getValue(),
            proteins: obj.proteins.getValue(),
            dairy: obj.dairy.getValue(),
            fats: obj.fats.getValue(),
            produce: obj.produce.getValue(),
            other: obj.otherOrganic.getValue()
          },
          plastics: {
            bottles: obj.bottles.getValue(),
            film: obj.film.getValue(),
            bags: obj.bags.getValue(),
            packaging: obj.packaging.getValue(),
            other: obj.otherPlastics.getValue()
          },
          textiles: {
            clothes: {
              sweaters: obj.sweaters.getValue(),
              shirts: obj.shirts.getValue(),
              pants: obj.pants.getValue(),
              socks: obj.socks.getValue()
            },
            shoes: {
              leatherShoes: obj.leatherShoes.getValue(),
              canvasShoes: obj.canvasShoes.getValue()
            },
            linens: {
              towels: obj.towels.getValue(),
              sheets: obj.sheets.getValue()
            },
            largeTextiles: {
              tablecloths: obj.tablecloths.getValue(),
              carpet: obj.carpet.getValue(),
              canvas: obj.canvas.getValue()
            },
            mixedClothing: {
              looseClothing: obj.looseClothing.getValue(),
              compactClothing: obj.compactClothing.getValue()
            }
          },
          metals: {
            steelCans: obj.steelCans.getValue(),
            ferrousCans: obj.ferrousCans.getValue(),
            petFood: obj.petFood.getValue(),
            aluminumCans: obj.aluminumCans.getValue(),
            oilFilters: obj.oilFilters.getValue(),
            radiator: obj.radiator.getValue(),
            aluminumFoil: obj.aluminumFoil.getValue(),
            compositeMetal: obj.compositeMetal.getValue()
          },
          glass: {
            bottles: obj.bottles.getValue(),
            windows: obj.windows.getValue(),
            mixedGlass: obj.mixedGlass.getValue()
          },
          trimmings: {
            yardTrimming: obj.yardTrimming.getValue(),
            grassClipping: obj.grassClipping.getValue(),
            leaves: obj.leaves.getValue(),
            largeLimbs: obj.largeLimbs.getValue(),
            dryPrunings: obj.dryPrunings.getValue(),
            greenPrunings: obj.greenPrunings.getValue(),
            baledStraw: obj.baledStraw.getValue(),
            looseStraw: obj.looseStraw.getValue(),
            compost: obj.compost.getValue()
          },
          appliances: {
            majorAppliances: obj.majorAppliances.getValue(),
            lights: obj.lights.getValue(),
            otherAppliances: obj.otherAppliances.getValue()
          },
          hazardousWaste: {
            paints: obj.paints.getValue(),
            antifreeze: obj.antifreeze.getValue(),
            usedMotorOil: obj.usedMotorOil.getValue(),
            motorVehicleBatteries: obj.motorVehicleBatteries.getValue(),
            tires: obj.tires.getValue()
          },
          inertsAndOthers: {
            concrete: obj.concrete.getValue(),
            asphaltPaving: obj.asphaltPaving.getValue(),
            asphaltRoofing: obj.asphaltRoofing.getValue(),
            brick: obj.brick.getValue(),
            fiberglassInsulation: obj.fiberglassInsulation.getValue(),
            gypsum: obj.gypsum.getValue(),
            woodAshes: obj.woodAshes.getValue()
          }
        }
      }
    case 'C':
    // Item Count / Values
      obj = refObj['C'].refs
      return {
        option: 'C',
        data: {
          paper: {
            usedPaper: obj.usedPaper.getValue(),
            officeSupplies: obj.officeSupplies.getValue(),
            phonebook: obj.phonebook.getValue(),
            newsprint: obj.newsprint.getValue(),
            computerPaper: obj.computerPaper.getValue(),
            corrugatedCardboard: obj.corrugatedCardboard.getValue(),
            mixedWastePaper: obj.mixedWastePaper.getValue(),
            nonRecyclablePaper: obj.nonRecyclablePaper.getValue()
          },
          organics: {
            bread: obj.bread.getValue(),
            fish: obj.fish.getValue(),
            meat: obj.meat.getValue(),
            shells: obj.shells.getValue(),
            milk: obj.milk.getValue(),
            cheese: obj.cheese.getValue(),
            butter: obj.butter.getValue(),
            solidFat: obj.solidFat.getValue(),
            oil: obj.oil.getValue(),
            produceWaste: obj.oil.getValue(),
            foodWaste: obj.foodWaste.getValue()
          },
          plastics: {
            largeBottles: obj.largeBottles.getValue(),
            smallBottles: obj.smallBottles.getValue(),
            unpigmented: obj.unpigmented.getValue(),
            pigmented: obj.pigmented.getValue(),
            beverageCase: obj.beverageCase.getValue(),
            breadCase: obj.breadCase.getValue(),
            gallonContainer: obj.gallonContainer.getValue(),
            smallBags: obj.smallBags.getValue(),
            largeBags: obj.largeBags.getValue(),
            styrofoam: obj.styrofoam.getValue(),
            polystyrene: obj.polystyrene.getValue(),
            pet: obj.pet.getValue(),
            otherPlastics: obj.otherPlastics.getValue()
          },
          textiles: {
            sweaters: obj.sweaters.getValue(),
            shirts: obj.shirts.getValue(),
            pants: obj.pants.getValue(),
            socks: obj.socks.getValue(),
            leatherShoes: obj.leatherShoes.getValue(),
            canvasShoes: obj.canvasShoes.getValue(),
            towels: obj.towels.getValue(),
            sheets: obj.sheets.getValue(),
            tablecloths: obj.tablecloths.getValue(),
            carpet: obj.carpet.getValue(),
            looseClothing: obj.looseClothing.getValue(),
            compactClothing: obj.compactClothing.getValue()
          },
          metals: {
            steelCans: obj.steelCans.getValue(),
            ferrousCans: obj.ferrousCans.getValue(),
            petFood: obj.petFood.getValue(),
            aluminumCans: obj.aluminumCans.getValue(),
            oilFilters: obj.oilFilters.getValue(),
            radiator: obj.radiator.getValue(),
            aluminumFoil: obj.aluminumFoil.getValue(),
            compositeMetal: obj.compositeMetal.getValue()
          },
          glass: {
            standardBottles: obj.standardBottles.getValue(),
            largeBottles: obj.largeBottles.getValue(),
            jugs: obj.jugs.getValue(),
            windowGlass: obj.windowGlass.getValue(),
            mixedGlass: obj.mixedGlass.getValue()
          },
          trimmings: {
            yardTrimming: obj.yardTrimming.getValue(),
            grassClipping: obj.grassClipping.getValue(),
            leaves: obj.leaves.getValue(),
            largeLimbs: obj.largeLimbs.getValue(),
            dryPrunings: obj.dryPrunings.getValue(),
            greenPrunings: obj.greenPrunings.getValue(),
            baledStraw: obj.baledStraw.getValue(),
            looseStraw: obj.looseStraw.getValue(),
            compost: obj.compost.getValue()
          },
          majorAppliances: {
            airConditioner: obj.airConditioner.getValue(),
            microwave: obj.microwave.getValue(),
            waterHeater: obj.waterHeater.getValue(),
            incandescentBulbs: obj.incandescentBulbs.getValue(),
            fluorescentBulbs: obj.fluorescentBulbs.getValue(),
            otherAppliances: obj.otherAppliances.getValue()
          },
          hazardousWaste: {
            paints: obj.paints.getValue(),
            antifreeze: obj.antifreeze.getValue(),
            usedMotorOil: obj.usedMotorOil.getValue(),
            motorVehicleBatteries: obj.motorVehicleBatteries.getValue(),
            tires: obj.tires.getValue()
          },
          inertsAndOthers: {
            concrete: obj.concrete.getValue(),
            asphaltPaving: obj.asphaltPaving.getValue(),
            asphaltRoofing: obj.asphaltRoofing.getValue(),
            brick: obj.brick.getValue(),
            fiberglassInsulation: obj.fiberglassInsulation.getValue(),
            gypsum: obj.gypsum.getValue(),
            woodAshes: obj.woodAshes.getValue()
          }
        }
      }
  }
}
class UMISMaterialsWorkbook extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      optionSelected: 'A'
    }
    this.nextSection = this.nextSection.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }
  nextSection (e) {
    e.preventDefault()
    let refObj = this.refs.workbookContainer.refs
    let data = {
      materials: materialsWorkbookCalculator(refObj, this.state)
    }
    this.props.saveValues(data)
    this.props.nextSection()
  }
  changeHandler (value) {
    this.setState({optionSelected: value})
  }

  render () {
    const optionSelected = this.state.optionSelected
    return (
      <div>
        <h3>Materials Workbook</h3>

        <h3>Estimate Demand</h3>
        <Input name='optionSelection' label='Option A:' type='radio' checked={optionSelected === 'A'}
          onChange={() => this.changeHandler('A')}/>
        <Input name='optionSelection' label='Option B:' type='radio' checked={optionSelected === 'B'}
          onChange={() => this.changeHandler('B')}/>
        <Input name='optionSelection' label='Option C:' type='radio' checked={optionSelected === 'C'}
          onChange={() => this.changeHandler('C')}/>
        <MaterialsWorkbookContainer ref='workbookContainer' optionSelected={optionSelected}/>
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
}

export default UMISMaterialsWorkbook
