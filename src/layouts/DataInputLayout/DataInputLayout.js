import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'
import UmisDataForm from 'layouts/DataInputLayout/DataInputPanes/UMIS/umisDataForm'
import CitizenSurvey from 'layouts/DataInputLayout/DataInputPanes/Survey/citizenSurvey'

type Props = {
  map: PropTypes.object.isRequired,
  audits: PropTypes.object
}
class DataInputLayout extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      opened: false
    }
    this.update = this.update.bind(this)
  }
  update (e) {
    // Set state calls render so necessary changes need to go before setState is called
    this.setState({opened: !this.state.opened})
  }
  render () {
    let dataInputClass = classNames({'data-input-opened': this.state.opened})
    let dataInputTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'data-input-closed-tabs': !this.state.opened,
      'dashboard-tabs-resources': true
    })
    let dataInputGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-plus': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'data-input-opened-glyph': this.state.opened,
      'data-input-toggle': !this.state.opened
    })
    return (
      <div id='data-input' className={dataInputClass}>
        <span id='data-input-toggle' className={dataInputGlyphClass} onClick={this.update}></span>
        <Tabs bsStyle='tabs' defaultActiveKey={1} className={dataInputTabsClass} justified>
          <Tab eventKey={1} title='Urban Metabolism'>
            <UmisDataForm map={this.props.map} inputOpened={this.state.opened} audits={this.props.audits}/>
          </Tab>
          <Tab eventKey={2} title='Citizen Survey'>
            <CitizenSurvey map={this.props.map} inputOpened={this.state.opened} audits={this.props.audits}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default DataInputLayout
