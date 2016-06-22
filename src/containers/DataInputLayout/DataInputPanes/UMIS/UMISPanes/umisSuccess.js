import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
let cityObj = {
  'lima': 'id_lote',
  'budapest': 'id',
  'cusco': 'gid',
  'abudhabi': 'plotid',
  'medellin': 'cobama'
}
let city = window.location.pathname.slice(1)
let cityTag = cityObj[city]

type Props = {
  nextStep: PropTypes.func,
  map: PropTypes.obj
}
class UMISSuccess extends React.Component {
  props: Props;
  constructor () {
    super()
    this.nextStep = this.nextStep.bind(this)
  }
  nextStep (e) {
    e.preventDefault()
    this.props.nextStep()
  }
  render () {
    return (
      <Button bsStyle='success' onClick={this.nextStep}>
        Sucessful Submit
      </Button>
    )
  }
  componentWillUnmount () {
    this.props.map.setFilter('lots-hover', ['==', cityTag, ''])
    if (typeof this.props.map.getLayer('point') !== 'undefined') this.props.map.removeLayer('point')
  }
}

export default UMISSuccess
