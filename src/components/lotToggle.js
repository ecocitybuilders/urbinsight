import React, { PropTypes } from 'react'
import { Checkbox } from 'react-bootstrap'

type Props = {
  map: PropTypes.object
}
class LotToggle extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      checked: true
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange () {
    typeof this.props.map.getLayer('lots') === 'undefined'
      ? this.props.map.addLayer({
        'id': 'lots',
        'type': 'fill',
        'source': 'lots',
        'source-layer': 'parcels',
        'layout': {
          'visibility': 'visible'
        },
        'interactive': true,
        'paint': {
          'fill-color': '#ff0000',
          'fill-opacity': 0.5,
          'fill-outline-color': '#ffffff'
        }
      }, 'surveys')
    : this.props.map.removeLayer('lots')
    this.setState({ checked: !this.state.checked })
  }

  render () {
    return (
      <div className='lot-toggle'>
        <Checkbox style={{margin: '0 auto', marginTop: '5px', marginLeft: '5px'}}
          checked={this.state.checked}
          onChange={this.onChange}>{this.state.checked ? 'Hide' : 'Show'} Parcels</Checkbox>
      </div>

    )
  }
}

export default LotToggle
