import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs, Tab } from 'react-bootstrap'
import DashboardResourcePane from './DataDashboardPanes/DashboardResource'
import DashboardSocioeconomicPane from './DataDashboardPanes/DashboardSocioeconomic'
import DashboardEnvironmentalAirPane from './DataDashboardPanes/DashboardEnvironmentalAir'
import DashboardEnvironmentalWaterPane from './DataDashboardPanes/DashboardEnvironmentalWater'
import DashboardEnvironmentalSoilPane from './DataDashboardPanes/DashboardEnvironmentalSoil'
import DashboardProjects from './DataDashboardPanes/DashboardProjects'
import DashboardQualitative from './DataDashboardPanes/DashboardQualitative'

type Props = {
  audits: PropTypes.object,
  surveys: PropTypes.object
}
class DataDashboard extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      opened: false
    }
    this.update = this.update.bind(this)
  }

  update (e) {
    this.setState({opened: !this.state.opened})
  }

  render () {
    let dashboardClass = classNames({
      'visualization-dashboard': true,
      'dashboard-opened': this.state.opened,
      'dashboard-closed': !this.state.opened
    })
    let dashboardTabsClass = classNames({
      'dashboard-tabs-closed': !this.state.opened
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-glyph-opened': this.state.opened,
      'dashboard-glyph-closed': !this.state.opened})

    return (

      <div className={dashboardClass}>
        <span style={{'zIndex': 1000}} className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle='tabs' defaultActiveKey={1} className={dashboardTabsClass} justified id='data-dashboard-tabs'>
          <Tab eventKey={1} title='UMIS'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass}
              justified id='data-dashboard-resource-tabs'>
              <Tab eventKey={1} title='Water'>
                <DashboardResourcePane resource='water' audits={this.props.audits}/>
              </Tab>
              <Tab eventKey={2} title='Materials'>
                <DashboardResourcePane resource='materials' audits={this.props.audits}/>
              </Tab>
              <Tab eventKey={3} title='Energy' disabled>
                <DashboardResourcePane resource='energy' audits={this.props.audits}/>
              </Tab>
              <Tab eventKey={4} title='Food' disabled>
                <DashboardResourcePane resource='food' audits={this.props.audits}/>
              </Tab>
              <Tab eventKey={5} title='Mobility' disabled>
                <DashboardResourcePane resource='mobility' audits={this.props.audits}/>
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey={2} title='Qualitative'>
            <DashboardQualitative surveys={this.props.surveys} map={this.props.map} viewport={this.props.viewport}/>
          </Tab>
          <Tab eventKey={3} title='Environmental' disabled>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified
              id='data-dashboard-environmental-tabs'>
              <Tab eventKey={1} title='Air'>
                <DashboardEnvironmentalAirPane />
              </Tab>
              <Tab eventKey={2} title='Water'>
                <DashboardEnvironmentalWaterPane />
              </Tab>
              <Tab eventKey={3} title='Soil'>
                <DashboardEnvironmentalSoilPane />
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey={4} title='Socioeconomic' disabled>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified
              id='data-dashboard-socioeconomic-tabs'>
              <Tab eventKey={1} title='Demographics'>
                <DashboardSocioeconomicPane indicator='demographics'/>
              </Tab>
              <Tab eventKey={2} title='Education'>
                <DashboardSocioeconomicPane indicator='education'/>
              </Tab>
              <Tab eventKey={3} title='Employment'>
                <DashboardSocioeconomicPane indicator='employment'/>
              </Tab>
              {/* <Tab eventKey={4} title='Healthcare' className={dashboardSocioeconomicTabClass}></Tab>*/}
              <Tab eventKey={4} title='Housing'>
                <DashboardSocioeconomicPane indicator='housing'/>
              </Tab>
            </Tabs>
          </Tab>

          <Tab eventKey={5} title='Projects' disabled>
            <h2 style={{textAlign: 'center'}}>Community Based Projects</h2>
            <DashboardProjects />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default DataDashboard
