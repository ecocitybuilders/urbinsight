import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap'

// const LayerLink = (props) => <div>
//   <Input label={this.props.title} type='checkbox'
//     onClick={this.props.layerSelected}
//   />
// </div>
// LayerLink.propTypes = {
//   layerSelected: PropTypes.func,
//   title: PropTypes.string,
//   name: PropTypes.string
// }
//
type Props2 = {
  layerSelected: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string
}
class LayerLink extends React.Component {
  props: Props2;
  constructor () {
    super()
    this.state = {
      'selected': false
    }
    this.layerSelected = this.layerSelected.bind(this)
  }
  layerSelected () {
    this.setState({selected: !this.state.selected})
    this.props.layerSelected(this.props.name)
  }
  render () {
    return (
      <Input label={this.props.title} type='checkbox' onClick={this.layerSelected} />
    )
  }
}
export default LayerLink
