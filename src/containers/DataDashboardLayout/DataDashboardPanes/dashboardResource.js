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
  constructor (props) {
    super(props)
    this.state = {
      chartData: {},
      chart: {},
      chartWidth: window.innerWidth < 992 ? window.innerWidth / 2 : window.innerWidth / 4,
      noData: true,
      mountId: 'resource-chart-' + props.resource
    }
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize (e) {
    let width = window.innerWidth < 992 ? window.innerWidth / 2 : window.innerWidth / 4
    this.state.chart.resize({'width': width})
    // this.setState({chartWidth: width})
  }

  componentDidMount () {
    let chartObj = {
      data: {
        json: {},
        type: 'pie'
      }
    }
    // let size = window.innerWidth < 992 ? window.innerWidth / 2 : window.innerWidth / 4
    chartObj.size = {width: this.state.chartWidth}
    chartObj.bindto = '#resource-chart-' + this.props.resource
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What?
    // am I making a bunch of extra of charts
    chartObj.data.json = this.state.chartData
    let chart = c3.generate(chartObj)
    this.setState({
      chart: chart
    })
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  componentWillUpdate (pp, ps) {
    if (this.state.chart.load) this.state.chart.load({json: ps.chartData})
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
          chartData: newTotalData
        })
      }
    }
    // console.log(this.state.totalData)
  }
  shouldComponentUpdate (np, ns) {
    // This is will create a problem if the same number of features is in view even though they are different
    if (typeof np.audits !== 'undefined' && typeof this.props.audits !== 'undefined') {
      return np.audits.length !== this.props.audits.length
    }
    return true
  }

  render () {
    const displayValue = _.isEmpty(this.state.chartData) ? 'none' : 'inherit'
    return (
      <div>
        <div className='dashboard-pane'>
          <Row>
            <Col md={6}>
              {_.isEmpty(this.state.chartData) && <div className='audit-data-message'><h3>No Audit Data</h3></div>}
              <div className='resource-chart-container'
                style={{display: displayValue, width: '100%', 'minHeight': '320px', 'height': '320px'}}
                id={this.state.mountId}></div>
            </Col>
            <Col md={6}>
              <div className='kpi-indicators'>
                <h3>KPI Indicators</h3>
                <div>
                  <h4>Adaptability Performance:</h4>
                  <h5>Water usage satisfied on site</h5>
                  <div id='kpi-indicators-adaptability-chart'>
                    I'm a Graphic
                  </div>
                </div>
                <div>
                  <h4>Adaptability Performance:</h4>
                  <h5>Demand exceeding Capacity</h5>
                  <div id='kpi-indicators-capacity-chart'>
                    I'm a Graphic
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='archetype-library'>
          <h3>Urban Archetype Library</h3>
          <select>
            <option>Hello</option>
            <option>World</option>
          </select>

          <div className='archetype-container'>
            <div>
              <img src={House} />
            </div>
            <div className='archetype-details'>
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
        <div className='archetype-action-buttons'>
          <div> Contribute </div>
          <div> Share </div>
          <div>Print</div>
        </div>
      </div>
    )
  }
}

export default DashboardResourcePane
