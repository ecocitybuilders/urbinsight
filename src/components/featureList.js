import React from 'react'
import classNames from 'classnames'

class FeatureList extends React.Component {
  constructor () {
    super()
    this.update = this.update.bind(this)
    this.state = {
      'opened': false
    }
  }

  update (e) {
    this.setState({'opened': !this.state.opened})
  }
  render () {
    let featureListClasses = classNames({
      'features-list': true,
      'features-list-open': this.state.opened,
      'features-list-closed': !this.state.opened
    })
    return (
      <div className={featureListClasses}>
        <span className='glyphicon glyphicon-remove' onClick={this.update}
          style={{'display': this.state.opened ? 'inline' : 'none'}}/>
        <br/>
        <div id='features' style={{'display': this.state.opened ? 'inline' : 'none'}}></div>
        <div className='features-tab' onClick={this.update}
          style={{'display': this.state.opened ? 'none' : null}}>View Features</div>
      </div>
    )
  }
}

export default FeatureList
