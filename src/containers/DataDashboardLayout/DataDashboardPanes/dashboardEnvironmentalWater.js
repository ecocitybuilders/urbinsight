import React from 'react'
import c3 from 'c3'
import { Button } from 'react-bootstrap'

let exampleData = {
  bindto: '#sample-chart-',
  data: {
    columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
    ]
  }
}

class DashboardEnvironmentalWaterPane extends React.Component {
  handleClick () {
    return
  }
  componentDidMount () {
    exampleData.size = {width: (screen.width / 2.7)}
    exampleData.bindto = '.water-quality-graph'
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What?
    c3.generate(exampleData)
  }
  render () {
    const mountId = 'water-quality-graph'
    return (
      <div className='environmental-pane'>
        <div className='environmental-quality-data-viz'>
          <div className='water-quality-graph environmental-quality-graph' id={mountId}></div>
          {/* This is actually a custom graph legend*/}
          <div className='eq-button-list'>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Overall</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Dissolved Oxygen</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Turbidity</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Total Solids</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>PH Level</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Temperature</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Nitrates</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Coliform</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>BOD</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Phosphorous</Button>
          </div>
        </div>
        <div className='pollutant-description'>
          <div>
            <img />
            <div>
              <h5>Pollutant</h5>
              <h5>Type</h5>
              <h5>Standard</h5>
              <h5>Averaging Time</h5>
            </div>
            <h3>Chemical Structure</h3>
            <h6>
              To Be Developed
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardEnvironmentalWaterPane
