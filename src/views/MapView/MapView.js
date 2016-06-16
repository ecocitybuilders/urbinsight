import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DataInputLayout from 'containers/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'containers/DataDashboardLayout/DataDashboardLayout'
import LayerSelection from 'containers/LayerSelectionLayout/LayerSelection'
import FeatureList from 'components/FeatureList'
import Overlay from 'components/Overlay'
import { connect } from 'react-redux'
import { requestSurveys } from 'redux/modules/survey'
import { requestAudits } from 'redux/modules/audit'
import { cityObjectFunc, surveyGeoJSONCompiler, auditGeoJSONCompiler, boundsArrayGenerator } from 'utils/mapUtils'
import { mapClickHandlerSwitcher, baseLayerandSource } from 'utils/mapUtils'
import server_endpoint from 'utils/serverUtils'
import _ from 'lodash'

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  audits: PropTypes.object,
  surveys: PropTypes.object,
  layers: PropType.array
}

class MapView extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.state = {
      mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
      mapView: {
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        center: cityObjectFunc(window.location.pathname.slice(1)),
        zoom: 15
      },
      // This is unmaintainable need to standardize city names
      city: window.location.pathname.slice(1) === 'abudhabi' ? 'abu_dhabi' : window.location.pathname.slice(1),
      layerList: [],
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        isDragging: false
      }
    }
  }

  render () {
    const { isAuthenticated, audits, surveys } = this.props
    const { viewport } = this.state
    return (
      <div id='mapContainer'>

        <div id='map'>
        {/*  Possibly need to move these outside of the map constainer*/}
          {/* <Overlay {...viewport}/>*/}
          <LayerSelection map={this.state.map} city={this.state.city}
            layerList={this.state.layerList}/>
          {isAuthenticated && <DataDashboardLayout audits={audits} surveys={surveys} />}
          {isAuthenticated && <DataInputLayout map={this.state.map} audits={audits}/>}
        </div>
        <FeatureList />
      </div>
    )
  }

  componentDidMount () {
    // CHANGE (This is unmaintainable...need to standardize citynames)
    let city = this.state.city === 'abu_dhabi' ? 'abudhabi' : this.state.city
    let tileLocation = 'http://' + server_endpoint + ':5001/data/city/lots/' + city + '/{z}/{x}/{y}.mvt'
    mapboxgl.accessToken = this.state.mapToken
    var map = new mapboxgl.Map(this.state.mapView)
    map.addControl(new mapboxgl.Navigation())
    baseLayerandSource(map, tileLocation)
    if (typeof this.state.city !== 'undefined') {
      let requestString = 'http://geonode.urbinsight.com/geoserver/rest/workspaces/' +
        `${this.state.city}/featuretypes.json`
      fetch(requestString, {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
        .then((response) => response.json())
        .then((layerList) => this.setState({layerList: layerList.featureTypes.featureType}))
    }
    this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
    this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    map.on('dragend', (e) => {
      this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
      this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    })
    let htmlString = ''
    map.on('mousemove', (e) => {
      let width = 5
      let features = map.queryRenderedFeatures([
        [e.point.x - width / 2, e.point.y - width / 2],
        [e.point.x + width / 2, e.point.x - width / 2]],
        { layers: this.props.layers })
      // let features = map.queryRenderedFeatures(e.point,
      //   { layers: this.props.layers })
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''
      if (features.length) {
        features.forEach((feature) => {
          htmlString += `<table id="features-table"><tr className='feature-row'>
            <td class='row-heading' colspan='2'>${feature.layer.id}</td>
          </tr>`
          _.forEach(feature.properties, (value, key) => {
            htmlString += '<tr className="feature-row"><td>' + key + '</td><td>' + value + '</td></tr>'
          })
        })
        htmlString += '</table></br></br>'
      } else {
        htmlString = '<div style="text-align: center;">No Feature Selected</div>'
      }
      document.getElementById('features').innerHTML = htmlString
    })
    // map.on('render', (e) => {
    //   console.log('rendering')
      // this.setState({
      //   viewport: {
      //     latitude: this.state.map.getCenter().lat,
      //     longitude: this.state.map.getCenter().lng,
      //     zoom: this.state.map.getZoom(),
      //     width: this.state.map.transform.width,
      //     height: this.state.map.transform.height,
      //     isDragging: false
      //   }
      // })
    // })
    this.setState({
      map: map,
      viewport: {
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
        zoom: map.getZoom(),
        width: map.transform.width,
        height: map.transform.height,
        isDragging: false
      }
    })
  }

  componentWillUpdate (np, ns) {
    ns.map.off('mousemove')
    ns.map.on('mousemove', (e) => {
      let htmlString = ''
      let features = ns.map.queryRenderedFeatures(e.point,
        { layers: np.layers })
      ns.map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''
      if (features.length) {
        features.forEach((feature) => {
          if (['auditPoints', 'auditPolygons', 'surveys'].indexOf(feature.layer.id) < 0) {
            htmlString += `<table id="features-table"><tr className='feature-row'>
              <td class='row-heading' colspan='2'>${feature.layer.id}</td>
            </tr>`
            _.forEach(feature.properties, (value, key) => {
              htmlString += '<tr className="feature-row"><td>' + key + '</td><td>' + value + '</td></tr>'
            })
            htmlString += '</table></br></br>'
          }
          htmlString = htmlString.length ? htmlString : '<div style="text-align: center;">No Feature Selected</div>'
        })
      } else {
        htmlString = '<div style="text-align: center;">No Feature Selected</div>'
      }
      document.getElementById('features').innerHTML = htmlString
    })
    // This is the changing the mouse interaction to be able to see the properties
    if (np.audits) {
      this.mapClickHandler(ns.map, 'featureSelection',
        {audits: np.audits, surveyDelete: np.surveyDelete, surveyUpdate: np.surveyUpdate}
      )
    }
    surveyGeoJSONCompiler(np.surveys, ns.map)
    auditGeoJSONCompiler(np.audits, ns.map)
  }

  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }

  mapClickHandler (map, keyword, options) {
    mapClickHandlerSwitcher(map, keyword, options)
  }
}

const mapStateToProps = (state) => {
  const { auth, survey, audit, layer } = state
  const { audits } = audit
  const { surveys } = survey
  const { isAuthenticated, errorMessage } = auth
  const { layers } = layer
  return {
    isAuthenticated,
    errorMessage,
    surveys,
    audits,
    layers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    surveysFetch: (bounds) => {
      dispatch(requestSurveys(bounds))
    },
    auditsFetch: (bounds) => {
      dispatch(requestAudits(bounds))
    },
    surveyDelete: (id) => {
      dispatch(null)
    },
    surveyUpdate: (survey) => {
      dispatch(null)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
