import React, { PropTypes } from 'react'
import classNames from 'classnames'
import LayerLink from 'components/LayerLink'
import OpenLayers from 'static/scripts/OpenLayersSLDmin'
import { mapboxStyleGenerator } from 'utils/mapUtils'
import { connect } from 'react-redux'
import { addLayer, removeLayer } from 'redux/modules/layer'

type Props = {
  city: PropTypes.string,
  layerList: PropTypes.array,
  map: PropTypes.object,
  layerSelected: PropTypes.func,
  layerAdded: PropTypes.func,
  layerRemoved: PropTypes.func
}

class UserLayerSelection extends React.Component {
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
    `&typename=geonode%3A${layerName}&outputFormat=json&version=1.0.0` +
    '&service=WFS&request=GetFeature'
    // let styleString = 'http://geonode.urbinsight.com/geoserver/rest/styles/' + `${this.props.city}_${layerName}.sld`
    let styleString = 'http://geonode.urbinsight.com/geoserver/rest/styles/' + `${layerName}.sld`
    let sourceExist = this.props.map.getSource(layerName)
    let layerExist = this.props.map.getLayer(layerName)
    let layerAdded = this.props.layerAdded
    const { map } = this.props
    if (typeof sourceExist === 'undefined') {
      map.addSource(layerName, {
        'type': 'geojson',
        'data': sourceString
      })
// Still looking to do the localStorage interaction
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
          mapboxStyleObjs.forEach((styleObj) => {
            layerAdded(styleObj.id)
            map.addLayer(styleObj)
          })
        })
    } else {
      map.getStyle().layers.forEach((layer) => {
        if (layer.id.includes(layerName)) {
          this.props.layerRemoved(layer.id)
          this.props.map.removeLayer(layer.id)
        }
      })
    }
  }
  update (e) {
    e.preventDefault()
    this.setState({opened: !this.state.opened})
  }
  render () {
    let layerListClass = classNames({'user-layer-list-opened': this.state.opened})
    // console.log(this.props.layerList)
    let listOfLayers = this.props.layerList.map(function (layer) {
      return (
        <LayerLink key={layer.name} name={layer.name} layerSelected={this.layerSelected}
          title={layer.name.split('_')
            .map(function (word) {
              if (typeof word[0] !== 'undefined') {
                return word[0].toUpperCase() + word.slice(1)
              }
            })
            .join(' ')} />
      )
    }.bind(this))
    // let listOfLayers = []
    let displayList = this.state.opened ? 'inherit' : 'none'
    let glyphClass = classNames({
      'glyphicon': true,
      'glyphicon-remove': this.state.opened,
      'layer-list-icon-open': this.state.opened,
      'glyphicon-list': !this.state.opened,
      'layer-list-icon-closed': !this.state.opened
    })
    return (
      <div id='user-layer-selection' className={layerListClass}>
        <div
          onClick={this.update}
          style={{'display': 'flex'}}>
          <span className={glyphClass} />
          <span style={{'display': this.state.opened ? 'none' : 'inline',
          'marginLeft': '15px', 'paddingTop': '5px'}}>Uploaded</span>
        </div>
        <div style={{'display': displayList, 'float': 'left', width: '90%', 'paddingLeft': '20px'}}>
          {listOfLayers}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { layer } = state
  const { layers } = layer
  return {
    layers
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    layerAdded: (layerID) => {
      dispatch(addLayer(layerID))
    },
    layerRemoved: (layerID) => {
      dispatch(removeLayer(layerID))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLayerSelection)
