import React, { PropTypes } from 'react'
import classNames from 'classnames'
import OpenLayers from 'static/scripts/OpenLayersSLDmin'

type Props = {
  city: PropTypes.string,
  layerList: PropTypes.array,
  map: PropTypes.object,
  layerSelected: PropTypes.func
}
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
    let linkClass = classNames({
      'selected-layer': this.state.selected
    })
    return (
      <li onClick={this.layerSelected} className={linkClass}>{this.props.title}</li>
    )
  }
}
class LayerSelection extends React.Component {
  props: Props;
  constructor () {
    super()
    this.state = {
      opened: false
    }
    this.update = this.update.bind(this)
    this.layerSelected = this.layerSelected.bind(this)
  }
  layerSelected (layerName) {
    let sourceString = 'http://geonode.urbinsight.com/geoserver/wfs?srsName=EPSG%3A4326' +
    `&typename=${this.props.city}%3A${layerName}&outputFormat=json&version=1.0.0` +
    '&service=WFS&request=GetFeature'
    let sourceExist = this.props.map.getSource(layerName)
    if (typeof sourceExist === 'undefined') {
      this.props.map.addSource(layerName, {
        'type': 'geojson',
        'data': sourceString
      })
      // features[0].geometry.type
      this.props.map.addLayer({
        'id': layerName,
        'type': 'fill',
        'source': layerName,
        'paint': {
          'fill-color': '#33ff33',
          'fill-opacity': 0.5,
          'fill-outline-color': '#000000'
        }
      })
    } else {
      this.props.map.removeLayer(layerName)
      this.props.map.removeSource(layerName)
    }
  }

  update (e) {
    this.setState({opened: !this.state.opened})
  }
  render () {
    console.log(OpenLayers)
    let layerListClass = classNames({'layer-list-opened': this.state.opened})
    let listOfLayers = this.props.layerList.map(function (layer) {
      return (
        <LayerLink key={layer.name} name={layer.name} layerSelected={this.layerSelected}
          title={layer.name.split('_')
            .map(function (word) {
              if (typeof word[0] !== 'undefined') {
                return word[0].toUpperCase() + word.slice(1)
              }
            })
            .join(' ')}/>
      )
    }.bind(this))
    let displayList = this.state.opened ? 'inherit' : 'none'
    let glyphClass = classNames({
      'glyphicon': true,
      'glyphicon-list': true,
      'layer-list-icon-open': this.state.opened,
      'layer-list-icon-closed': !this.state.opened
    })
    return (
      <div id='layer-selection' className={layerListClass}>
        <span
          className={glyphClass}
          onClick={this.update}></span>
        <ul style={{'display': displayList}}>
          {listOfLayers}
        </ul>
      </div>
    )
  }
  componentDidMount () {

  }
}
// .then((layerList) => console.log(layerList))
export default LayerSelection
