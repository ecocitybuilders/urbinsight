import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'
import UmisDataForm from './DataInputPanes/UMIS/umisDataForm'
import CitizenSurvey from './DataInputPanes/Survey/citizenSurvey'

type Props = {
  map: PropTypes.object.isRequired,
  mapClickHandler: PropTypes.func
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
    let dataInputClass = classNames({
      'data-input': true,
      'data-input-opened': this.state.opened,
      'data-input-opened-screen-size': this.state.opened,
      'data-input-closed': !this.state.opened
    })
    let dataInputTabsClass = classNames({
      'dashboard-tabs-opened': this.state.opened,
      'dashboard-tabs-closed': !this.state.opened
    })
    let dataInputGlyphClass = classNames({
      'glyphicon': true,
      'glyphicon-plus': !this.state.opened,
      'glyphicon-remove': this.state.opened,
      'data-input-glyph-opened': this.state.opened,
      'data-input-glyph-closed': !this.state.opened
    })
    return (
      <div className={dataInputClass}>
        <span style={{'zIndex': 1000}} className={dataInputGlyphClass}
          onClick={this.update}></span>
        <Tabs bsStyle='tabs' activeKey={this.state.key} id='data-input-tabs'
          onSelect={this.handleSelect} className={dataInputTabsClass} justified unmountOnExit>
          <Tab eventKey={1} title='Urban Metabolism' unmountOnExit>
            <UmisDataForm map={this.props.map} inputOpened={this.state.opened}
              mapClickHandler={this.props.mapClickHandler}
              activeInput={this.state.activeInput}/>
          </Tab>
          <Tab eventKey={2} title='Citizen Survey' unmountOnExit>
            <CitizenSurvey map={this.props.map} inputOpened={this.state.opened}
              mapClickHandler={this.props.mapClickHandler}
              activeInput={this.state.activeInput}/>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default DataInputLayout
