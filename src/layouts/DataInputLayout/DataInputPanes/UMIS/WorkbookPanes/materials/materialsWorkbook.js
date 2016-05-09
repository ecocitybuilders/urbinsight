import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'
import MaterialsWorkbookContainer from './materialsWorkbookContainer'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func,
  saveValues: PropTypes.func
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
      materials: {}
    }
    this.props.saveValues(data)
    this.props.nextSection()
  }
  changeHandler (value) {
    this.setState({optionSelected: value})
  }

  let materialsWorkbookCalculator = function (refObj, state) {
    switch (state.optionSelected) {
      case 'A':
      // Percentages
        let obj = refObj['A'].refs
        return {
          totalWeight: obj.totalWeight.getValue(),
          paper: obj.paper.getVaue(),
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
      case 'B':
      // Percentages
        let obj = refObj['B'].refs
        return {
          totalWeight: obj.totalWeight.getValue()
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
            produce: obj.produce.getValue()
            other: obj.otherOrganic.getValue()
          },
          plastics: {
            bottles: obj.bottles.getValue(),
            film: obj.film.getValue(),
            bags: obj.bags.getValue(),
            packaging: obj.packaging.getValue(),
            other: obj.otherPlastics.getVlaue()
          },
          textiles: {
            clothes: obj.clothes.getValue(),
            shoes: obj.shoes.getValue(),
            linens: obj.linens.getValue(),
            largeTextiles: obj.largeTextiles.getValue(),
            mixedClothing: obj.mixedClothing.getValue()
          }
        }
      case 'C':
      // Item Count / Values
        let obj = refObj['C'].refs
        return {

        }
    }
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
