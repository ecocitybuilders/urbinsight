import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'
import UmisDataForm from './DataInputPanes/UMIS/umisDataForm'
import CitizenSurvey from './DataInputPanes/Survey/citizenSurvey'

type Props = {
  map: PropTypes.object.isRequired,
  audits: PropTypes.object
}
class DataInputLayout extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      opened: false,
      activeInput: 'UMIS'
    }
    this.update = this.update.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  update (e) {
    this.setState({opened: !this.state.opened})
  }

  handleSelect (key) {
    let newActiveInput = this.state.activeInput === 'UMIS' ? 'Survey' : 'UMIS'
    this.setState({
      key: key,
      activeInput: newActiveInput
    })
  }
  render () {
    let dataInputClass = classNames({'data-input-opened': this.state.opened})
    let dataInputTabsClass = classNames({
      'dashboard-opened-tabs': this.state.opened,
      'dashboard-closed-tabs': !this.state.opened
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
        <Tabs bsStyle='tabs' activeKey={this.state.key}
          onSelect={this.handleSelect} className={dataInputTabsClass} justified>
          <Tab eventKey={1} title='Urban Metabolism'>
            <UmisDataForm map={this.props.map} inputOpened={this.state.opened}
              audits={this.props.audits} activeInput={this.state.activeInput}/>
          </Tab>
          <Tab eventKey={2} title='Citizen Survey'>
            <CitizenSurvey map={this.props.map} inputOpened={this.state.opened}
              audits={this.props.audits} activeInput={this.state.activeInput}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default DataInputLayout
