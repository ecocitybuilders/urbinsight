import React from 'react';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import LandcoverPreCalc from './LandcoverPreCalc';
import WaterDemandJunctions from './DemandJunctions';

class UmisWaterWorkbook extends React.Component {
  handleClick(panel, e){
    e.preventDefault();
    this.props.handleNavigation(panel);
  }
  render(){
    return(
      <div>
        <h3>Water Workbook</h3>
        <LandcoverPreCalc />
        <WaterDemandJunctions />
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

export default UmisWaterWorkbook
