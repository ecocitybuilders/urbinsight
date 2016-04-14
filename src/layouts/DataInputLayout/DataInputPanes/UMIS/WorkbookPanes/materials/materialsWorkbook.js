import React, { PropTypes } from 'react'
import { Button, Input, Col } from 'react-bootstrap'
import MaterialsOptionA from './OptionA'
import MaterialsOptionB from './OptionB'
import MaterialsOptionC from './OptionC'

class UMISMaterialsWorkbook extends React.Component {
  static propTypes = {
    nextSection: PropTypes.func,
    prevSection: PropTypes.func
  };
  constructor () {
    super()
    this.nextSection = this.nextSection.bind(this)
  }
  nextSection (e) {
    e.preventDefault()
    this.props.nextSection()
  }
  render () {
    return (
      <div>
        <h3>Materials Workbook</h3>

        <h3>Estimate Demand</h3>
        <Input name='optionSelection' label='Option A:' type='radio' />
        <Input name='optionSelection' label='Option B:' type='radio' />
        <Input name='optionSelection' label='Option C:' type='radio' />
        {/* <div ng-show='optionSelected === 'A''> */}

        <MaterialsOptionA/>
        <MaterialsOptionB/>
        <MaterialsOptionC/>
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
