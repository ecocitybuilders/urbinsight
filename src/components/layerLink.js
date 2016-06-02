import React, { PropTypes } from 'react'
import { Checkbox } from 'react-bootstrap'

const LayerLink = (props) => <div>
  <Checkbox label={props.title} type='checkbox'
    onClick={() => props.layerSelected(props.name)}
  />
</div>
LayerLink.propTypes = {
  layerSelected: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string
}

export default LayerLink
