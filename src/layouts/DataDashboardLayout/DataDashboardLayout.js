import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs, Tab } from 'react-bootstrap'
// import { connect } from 'react-redux'
import DashboardResourcePane from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardResource'
import DashboardSocioeconomicPane from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardSocioeconomic'
import DashboardEnvironmentalAirPane from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardEnvironmentalAir'
import DashboardEnvironmentalWaterPane from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardEnvironmentalWater'
import DashboardEnvironmentalSoilPane from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardEnvironmentalSoil'
import DashboardProjects from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardProjects'
import DashboardQualitative from 'layouts/DataDashboardLayout/DataDashboardPanes/DashboardQualitative'

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
    let dashboardClass = classNames({'dashboard-opened': this.state.opened})
    let dashboardTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened
    })
    let dashboardGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-chevron-right': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'dashboard-opened-glyph': this.state.opened,
      'dashboard-glyph-closed': !this.state.opened})

    return (

      <div id='visualization-dashboard' className={dashboardClass}>
        <span className={dashboardGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle='tabs' defaultActiveKey={1} className={dashboardTabsClass} justified>
          <Tab eventKey={1} title='Urban Metabolism'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified>
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
          <Tab eventKey={2} title='Environmental'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified>
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
          <Tab eventKey={3} title='Socioeconomic'>
            <Tabs bsStyle='pills' defaultActiveKey={1} className={dashboardTabsClass} justified>
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
          <Tab eventKey={4} title='Qualitative'>
            <h3>
              Average Response - Quality of Life
            </h3>
            <DashboardQualitative surveys={this.props.surveys} />
          </Tab>
          <Tab eventKey={5} title='Projects'>
            <h2 style={{textAlign: 'center'}}>Community Based Projects</h2>
            <DashboardProjects />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   const { audit } = state
//   const { isFetching } = audit
//   return {
//     isFetching
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {}
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DataDashboard)

export default DataDashboard
