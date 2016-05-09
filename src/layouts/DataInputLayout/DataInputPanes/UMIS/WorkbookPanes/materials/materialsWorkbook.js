import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'
import MaterialsWorkbookContainer from './materialsWorkbookContainer'

type Props = {
  nextSection: PropTypes.func,
  prevSection: PropTypes.func
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
        <MaterialsWorkbookContainer optionSelected={optionSelected}/>
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
