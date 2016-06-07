import React, { PropTypes } from 'react'
import c3 from 'c3'
import House from 'static/images/House-In-Monasterios_1.jpg'
import _ from 'lodash'
import { Grid, Row, Col } from 'react-bootstrap'

// Load classes based on the Data model using classNames
class DashboardResourcePane extends React.Component {
  static propTypes = {
    resource: PropTypes.string.isRequired,
    audits: PropTypes.array
  };
  constructor () {
    super()
    this.state = {
      totalData: {},
      chart: {},
      noData: true
    }
  }
  componentDidMount () {
    let chartObj = {
      bindto: '#resource-chart-',
      data: {
        json: {},
        type: 'pie'

      }
    }
    let size = screen.width / 4
    // chartObj.size = {width: size}
    chartObj.bindto = '#resource-chart-' + this.props.resource
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What?
    // am I making a bunch of extra of charts
    chartObj.data.json = this.state.totalData
    let chart = c3.generate(chartObj)
    this.setState({
      chart: chart
    })
  }
  componentDidUpdate (pp, ps) {
    if (ps.chart.load) ps.chart.load({json: ps.totalData})
  }
  componentWillReceiveProps (np) {
    if (typeof np.audits !== 'undefined') {
      if (typeof this.props.audits === 'undefined' ||
        np.audits.length !== this.props.audits.length
      ) {
        const resource = np.resource
        let newTotalData = {}
        np.audits.forEach(function (audit) {
          _.forEach(audit.properties.totalDemand[resource], function (value, key) {
            typeof newTotalData[key] === 'undefined' ? newTotalData[key] = [value] : newTotalData[key].push(value)
          })
        })
        this.setState({
          totalData: newTotalData
        })
      }
    }
    // console.log(this.state.totalData)
  }
  shouldComponentUpdate (np, ns) {
    if (typeof np.audits !== 'undefined' && typeof this.props.audits !== 'undefined') {
      return np.audits.length !== this.props.audits.length
    }
    return true
  }

  render () {
    const mountId = 'resource-chart-' + this.props.resource
    const displayValue = _.isEmpty(this.state.totalData) ? 'none' : 'inherit'
    return (
      <div>
        <div className='dashboard-pane'>
          <Row>
            <Col md={6}>
              {_.isEmpty(this.state.totalData) && <div className='audit-data-message'><h3>No Audit Data</h3></div>}
              <div className='resource-chart-container'
                style={{display: displayValue, width: '100%', 'min-height': '320px', 'height': '320px'}}
                id={mountId}></div>
            </Col>
            <Col md={6}>
              <div className='kpi-indicators'>
                <h2>KPI Indicators</h2>
                <div>
                  <h3>Adaptability Performance:</h3>
                  <h4>Water usage satisfied on site</h4>
                  <div id='kpi-indicators-adaptability-chart'>
                    I'm a Graphic
                  </div>
                </div>
                <div>
                  <h3>Adaptability Performance:</h3>
                  <h4>Demand exceeding Capacity</h4>
                  <div id='kpi-indicators-capacity-chart'>
                    I'm a Graphic
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div id='archetype-library'>
          <h3>Urban Archetype Library</h3>
          <h4>Browse Different Resources</h4>
          <select id='archetype-selection'>
            <option>Hello</option>
            <option>World</option>
          </select>

          <div id='archetype-holder'>
            <div id='archetype-image-holder'><img id='archetype-image' src={House}></img></div>
            <div id='archetype-text-holder'>
              <h5><strong>Type:</strong> Two Story Detached</h5>
              <h5><strong>Zoning:</strong> Residential</h5>
              <h5><strong>Age:</strong> pre-1970s</h5>
              <h5><strong>Water Use:</strong>lots of rambling
              lots of ramblinglots of ramblinglots of ramblinglots of rambling
            lots of ramblinglots of ramblinglots of ramblinglots of rambling
          lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
        lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
      lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
    lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
  lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
lots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of ramblinglots of rambling
              </h5>
            </div>
          </div>
        </div>
        <div id='archetype-action-buttons'>
          <div id='archetype-action-button'> Contribute </div>
          <div id='archetype-action-button'> Share </div>
          <div id='archetype-action-button'>Print</div>
        </div>
      </div>
    )
  }
}

export default DashboardResourcePane
