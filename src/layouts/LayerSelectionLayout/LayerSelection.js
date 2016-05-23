import React, { PropTypes } from 'react'

type Props = {
  city: PropTypes.string
}
class LayerSelection extends React.Component {
  props: Props;
  render () {
    return (
      <div id='layer-selection'>
        <span style={{'paddingTop': '8px', 'paddingLeft': '9px'}} className='glyphicon glyphicon-list'></span>
      </div>
    )
  }
  componentDidMount () {
    console.log(this.props.city)
    let requestString = `http://geonode.urbinsight.com/geoserver/rest/workspaces/${this.props.city}/featuretypes.json`
    fetch(requestString, {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
      .then((response) => response.json()).then((layerList) => console.log(layerList))
  }
}
// .then((layerList) => console.log(layerList))
export default LayerSelection
