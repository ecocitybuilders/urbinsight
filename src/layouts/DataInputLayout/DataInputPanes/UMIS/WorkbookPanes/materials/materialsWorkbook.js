import React from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import MaterialsOptionA from './OptionA';
import MaterialsOptionB from './OptionB';
import MaterialsOptionC from './OptionC';


class UmisMaterialsWorkbook extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleNavigation(panel);
  }
  render(){
    return(
      <div>
        <h3>Materials Workbook</h3>

        <h3>Estimate Demand</h3>
        <Input name="optionSelection" label="Option A:" type="radio" />
        <Input name="optionSelection" label="Option B:" type="radio" />
        <Input name="optionSelection" label="Option C:" type="radio" />
        {/*<div ng-show="optionSelected === 'A'">*/}

        <MaterialsOptionA/>
        <MaterialsOptionB/>
        <MaterialsOptionC/>
        <Col sm={6}>
          <Button bsStyle="info" onClick={this.handleClick.bind(this, 'back')}>
            <span className="glyphicon glyphicon-circle-arrow-left"></span> Previous Section
          </Button>
        </Col>
        <Col sm={6}>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, 'forward')}>
            Next Section <span className="glyphicon glyphicon-circle-arrow-right"></span>
          </Button>
        </Col>
      </div>
    )
  }
}

export default UmisMaterialsWorkbook
