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

class DashboardEnvironmentalSoilPane extends React.Component {
  handleClick () {
    return
  }
  componentDidMount () {
    exampleData.size = {width: (screen.width / 2.7)}
    exampleData.bindto = '.soil-quality-graph'
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What? Obviously you used +=
    c3.generate(exampleData)
  }
  render () {
    const mountId = 'soil-quality-graph'
    return (
      <div className='environmental-pane'>
        <div className='environmental-quality-data-viz'>
          <div className='soil-quality-graph environmental-quality-graph' id={mountId}></div>
          {/* This is actually a custom graph legend*/}
          <div className='eq-button-list'>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Overall</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Texture</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Water Content</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Infiltration Rate</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>
              Aggregate Stability
            </Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Slaking</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>PH</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Respiration</Button>
            <Button className='pollutant' onClick={this.handleClick} bsStyle='warning' block>Nitrates</Button>
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
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
              Lots of Information Lots of Information Lots of Information
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardEnvironmentalSoilPane
