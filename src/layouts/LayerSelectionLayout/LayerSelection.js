import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Input } from 'react-bootstrap'
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
      <Input label={this.props.title} type='checkbox' onClick={this.layerSelected} className={linkClass} />
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
    let styleString = 'http://geonode.urbinsight.com/geoserver/rest/styles/' + `${this.props.city}_${layerName}.sld`
    let sourceExist = this.props.map.getSource(layerName)
    let layerExist = this.props.map.getLayer(layerName)
    let mapboxStyleObjs = []
    const { map } = this.props
    if (typeof sourceExist === 'undefined') {
      this.props.map.addSource(layerName, {
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
          let styleObj = format.read(sld)

          styleObj.namedLayers.map((layer) => {
            layer.userStyles.forEach((style) => {
              style.rules.forEach((rule) => {
                rule.symbolizers.forEach((symbolizer) => {
                  let styleType
                  if (symbolizer.CLASS_NAME.split('.').indexOf('Point') > -1) {
                    styleType = 'point'
                  } else if (symbolizer.CLASS_NAME.split('.').indexOf('Line') > -1) {
                    styleType = 'line'
                  } else if (symbolizer.CLASS_NAME.split('.').indexOf('Polygon') > -1) {
                    styleType = 'polygon'
                  }
                  let styleSpec = {}
                  styleSpec['source'] = layerName
                  styleSpec['id'] = layerName
                  switch (styleType) {
                    case 'point':
                      styleSpec['type'] = 'circle'
                      styleSpec['paint'] = {
                        'circle-radius': symbolizer.pointRadius,
                        'circle-color': symbolizer.fillColor.substring(0, 7)
                      }
                      break
                    case 'line':
                      styleSpec['type'] = 'line'
                      styleSpec['paint'] = {
                        'line-color': symbolizer.strokeColor.substring(0, 7),
                        'line-opacity': 0.8,
                        'line-width': 2
                      }
                      break
                    case 'polygon':
                      styleSpec['type'] = 'fill'
                      styleSpec['paint'] = {
                        'fill-color': symbolizer.fillColor.substring(0, 7),
                        'fill-opacity': 0.8,
                        'fill-outline-color': symbolizer.strokeColor || '#000000'
                      }
                      break
                  }
                  if (rule.filter) styleSpec['filter'] = [rule.filter.type, rule.filter.property, rule.filter.value]
                  mapboxStyleObjs.push(styleSpec)
                })
              })
            })
          })
          window.map = map
          mapboxStyleObjs.forEach(function (styleObj) {
            map.addLayer(styleObj)
          })
        })
    } else {
      this.props.map.removeLayer(layerName)
    }
  }
  update (e) {
    this.setState({opened: !this.state.opened})
  }
  render () {
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
        <div style={{'display': displayList}}>
          {listOfLayers}
        </div>
      </div>
    )
  }
  componentDidMount () {

  }
}
// .then((layerList) => console.log(layerList))
export default LayerSelection
