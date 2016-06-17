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

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  surveyUpdate: PropTypes.func,
  surveyDelete: PropTypes.func,
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
      layerList: []
    }
    this.mapClickHandler = this.mapClickHandler.bind(this)
  }

  render () {
    const { isAuthenticated, audits, surveys } = this.props
    return (
      <div id='mapContainer'>

        <div id='map'>
        {/*  Possibly need to move these outside of the map constainer*/}
          {/* <Overlay map={this.state.map}/>*/}
          <LayerSelection map={this.state.map} city={this.state.city}
            layerList={this.state.layerList}/>
          <DataDashboardLayout ref='dataDashboard' audits={audits} surveys={surveys} map={this.state.map}/>
          {isAuthenticated && <DataInputLayout ref='dataInput'
            map={this.state.map} mapClickHandler={this.mapClickHandler}/>}
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
    this.setState({
      map: map
    })
  }

  componentWillUpdate (np, ns) {
    if (!this.refs.dataInput.state.opened && np.audits.length > this.props.audits.length) {
      this.mapClickHandler('featureSelection',
        {audits: np.audits, surveyDelete: np.surveyDelete, surveyUpdate: np.surveyUpdate}
      )
    }
    typeof ns.map.getSource('surveys') !== 'undefined'
      ? ns.map.getSource('surveys').setData(surveyGeoJSONCompiler(np.surveys))
      : null

    auditGeoJSONCompiler(np.audits, ns.map)
  }

  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }

  mapClickHandler (keyword, options) {
    this.state.map
      ? keyword === 'featureSelection'
        ? mapClickHandlerSwitcher(this.state.map, keyword, {audits: this.props.audits, layers: this.props.layers})
        : mapClickHandlerSwitcher(this.state.map, keyword, options)
      : null
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
