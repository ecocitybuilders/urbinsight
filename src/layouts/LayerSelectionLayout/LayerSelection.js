import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LayerLink from 'components/LayerLink'
import OpenLayers from 'static/scripts/OpenLayersSLDmin'
import { mapboxStyleGenerator } from 'utils/mapUtils'

type Props = {
  city: PropTypes.string,
  layerList: PropTypes.array,
  map: PropTypes.object,
  layerSelected: PropTypes.func
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
    let styleString = 'http://geonode.urbinsight.com/geoserver/rest/styles/' + `${this.props.city}_${layerName}.sld`
    let sourceExist = this.props.map.getSource(layerName)
    let layerExist = this.props.map.getLayer(layerName)

    const { map } = this.props
    if (typeof sourceExist === 'undefined') {
      map.addSource(layerName, {
        'type': 'geojson',
        'data': sourceString
      })

      // fetch('http://geonode.urbinsight.com/geoserver/rest/styles/cusco_tcobertura_vegetal.sld')
      // window.localStorage.setItem(layerName, )
    }
    if (typeof layerExist === 'undefined') {
      fetch(styleString,
      {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
        .then((response) => response.text())
        .then(function (sld) {
          let format = new OpenLayers.Format.SLD({
            multipleSymbolizers: true,
            namedLayersAsArray: true
          })
          let sldObj = format.read(sld)
          let mapboxStyleObjs = mapboxStyleGenerator(sldObj, layerName)
          mapboxStyleObjs.forEach(function (styleObj) {
            map.addLayer(styleObj)
          })
        })
    } else {
      map.getStyle().layers.forEach((layer) => {
        layer.id.includes(layerName) ? this.props.map.removeLayer(layer.id) : null
      })
    }
  }
  update (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }
  render () {
    let layerListClass = classNames({'layer-list-opened': this.state.opened})
    let listOfLayers = this.props.layerList.map((layer) => {
      return <LayerLink key={layer.name} name={layer.name} layerSelected={this.layerSelected}
        title={layer.name.split('_')
            .map(function (word) {
              if (typeof word[0] !== 'undefined') {
                return word[0].toUpperCase() + word.slice(1)
              }
            })
            .join(' ')}/> })
    let displayList = this.state.opened ? 'inherit' : 'none'
    let glyphClass = classNames({
      'glyphicon': true,
      'glyphicon-remove': this.state.opened,
      'layer-list-icon-open': this.state.opened,
      'glyphicon-list': !this.state.opened,
      'layer-list-icon-closed': !this.state.opened
    })
    return (
      <div id='layer-selection' className={layerListClass}>
        <div
          className={glyphClass}
          onClick={this.update}></div>
        <div style={{'display': displayList, 'float': 'left', width: '90%', 'paddingLeft': '20px'}}>
          {listOfLayers}
        </div>
      </div>
    )
  }
}

export default LayerSelection
