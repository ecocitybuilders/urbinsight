import React, { PropTypes } from 'react'
import { Input } from 'react-bootstrap'

const LayerLink = (props) => <div>
  <Input label={props.title} type='checkbox'
    onClick={() => props.layerSelected(props.name)}
  />
</div>
LayerLink.propTypes = {
  layerSelected: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string
}
// type Props2 = {
//   layerSelected: PropTypes.func,
//   title: PropTypes.string,
//   name: PropTypes.string
// }
// class LayerLink extends React.Component {
//   props: Props2;
//   constructor () {
//     super()
//     this.state = {
//       'selected': false
//     }
//     this.layerSelected = this.layerSelected.bind(this)
//   }
//   layerSelected () {
//     this.setState({selected: !this.state.selected})
//     this.props.layerSelected(this.props.name)
//   }
//   render () {
//     let linkClass = classNames({
//       'selected-layer': this.state.selected
//     })
//     return (
//       <Input label={this.props.title} type='checkbox' onClick={this.layerSelected} className={linkClass} />
//     )
//   }
// }
export default LayerLink
