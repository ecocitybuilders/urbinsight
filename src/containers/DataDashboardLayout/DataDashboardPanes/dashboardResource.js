import React, { PropTypes } from 'react'
import c3 from 'c3'
import House from 'static/images/House-In-Monasterios_1.jpg'
import Chart from 'static/images/temp-chart.png'
import Medellin from 'static/images/medellin.jpg'
import Graphic1 from 'static/images/graphic1.png'
import Graphic2 from 'static/images/graphic2.png'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
import turf from 'turf'
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
      chartWidth: window.innerWidth < 992
        ? (window.innerWidth < 778 ? window.innerWidth : window.innerWidth / 2) : window.innerWidth / 4,
      noData: true,
      mountId: 'resource-chart-' + props.resource,
      auditsInView: []
    }
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize (e) {
    let width = window.innerWidth < 992
      ? (window.innerWidth < 778 ? window.innerWidth : window.innerWidth / 2) : window.innerWidth / 4
    this.state.chart.resize({'width': width})
  }

  componentDidMount () {
    let chartObj = {
      data: {
        json: {},
        type: 'pie'
      }
    }
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
    if (typeof np.audits !== 'undefined' && np.viewport.extent) {
      let bboxPolygon = turf.bboxPolygon(np.viewport.extent)
      let auditFC = turf.featureCollection(np.audits)
      let auditsInView = []
      auditFC.features.forEach(function (audit) {
        if (typeof turf.intersect(audit, bboxPolygon) !== 'undefined') {
          auditsInView.push(audit)
        }
      })
      const resource = np.resource
      let newTotalData = {}
      auditsInView.forEach(function (audit) {
        _.forEach(audit.properties.totalDemand[resource], function (value, key) {
          typeof newTotalData[key] === 'undefined' ? newTotalData[key] = [value] : newTotalData[key].push(value)
        })
      })
      this.setState({
        auditsInView: auditsInView,
        chartData: newTotalData
      })
    }
  }
  shouldComponentUpdate (np, ns) {
    // This is will create a problem if the same number of features is in view even though they are different
    // possibly will need to return true
    return this.state.auditsInView.length !== ns.auditsInView.length
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
                id={this.state.mountId}>
                </div>

              {/* <img src={Chart} /> */}
            </Col>
            <Col md={6}>
              <div className='kpi-indicators'>
                <h3>KPI Indicators</h3>
                <div>
                  <h4>Adaptability Performance:</h4>
                  <h5>Water usage satisfied on site</h5>
                  <div id='kpi-indicators-adaptability-chart'>
                    <img src={Graphic1} />
                  </div>
                </div>
                <div>
                  <h4>Adaptability Performance:</h4>
                  <h5>Demand exceeding Capacity</h5>
                  <div id='kpi-indicators-capacity-chart'>
                    <img src={Graphic2} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className='archetype-library'>
          <h3>Urban Archetype Library</h3>
          <div className='archetype-container'>
            <Row>
              <Col md={6}>
                <div>
                  <img src={Medellin} />
                </div>
              </Col>
              <Col md={6}>
                <div className='archetype-details'>
                  <h5><strong>Type:</strong> 1 or 2 story cinder block, corrugated roof</h5>
                  <h5><strong>Zoning:</strong> Hillside comuna</h5>
                  <h5><strong>Age:</strong> post - 1970s</h5>
                  {/*<h5><strong>Water Use:</strong></h5>*/}
                </div>
              </Col>
            </Row>
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
