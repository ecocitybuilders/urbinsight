import React, { PropTypes } from 'react'
import DataInputLayout from 'containers/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'containers/DataDashboardLayout/DataDashboardLayout'
import LayerSelection from 'containers/LayerSelectionLayout/LayerSelection'
import UserLayerSelection from 'containers/LayerSelectionLayout/UserLayerSelection'
import FeatureList from 'components/FeatureList'
import LotToggle from 'components/LotToggle'
// import Overlay from 'components/Overlay'
import { connect } from 'react-redux'
import { requestSurveys, deleteSurvey, updateSurvey } from 'redux/modules/survey'
import { requestAudits } from 'redux/modules/audit'
import { cityObjectFunc, surveyGeoJSONCompiler, auditGeoJSONCompiler, boundsArrayGenerator,
  mapClickHandlerSwitcher, baseLayerandSource } from 'utils/mapUtils'
import serverEndpoint from 'utils/serverUtils'

const mapboxgl = window.mapboxgl

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  surveyUpdate: PropTypes.func,
  surveyDelete: PropTypes.func,
  audits: PropTypes.object,
  surveys: PropTypes.object,
  layers: PropTypes.array,
  locationBeforeTransitions: PropTypes.object
}

class MapView extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    let city = props.locationBeforeTransitions.pathname.slice(1)
    this.state = {
      mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
      mapView: {
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        center: cityObjectFunc(city),
        zoom: 15
      },
      // This is unmaintainable need to standardize city names
      city: city,
      layerList: [],
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        isDragging: false
      },
      tileLocation: 'http://' + serverEndpoint + ':5001/data/city/lots/' + city + '/{z}/{x}/{y}.mvt'
    }
    this.mapClickHandler = this.mapClickHandler.bind(this)
  }
// add component will receive props call to set the city
  render () {
    const { isAuthenticated, audits, surveys } = this.props
    return (
      <div id='mapContainer'>

        <div id='map'>
        {/*  Possibly need to move these outside of the map constainer*/}
          {/* <Overlay map={this.state.map}/>*/}
          <LotToggle map={this.state.map} />
          <LayerSelection map={this.state.map} city={this.state.city}
            layerList={this.state.layerList} />
          <UserLayerSelection map={this.state.map} city={this.state.city}
            layerList={this.state.userLayerList} />
          <DataDashboardLayout ref='dataDashboard' audits={audits} surveys={surveys}
            map={this.state.map} viewport={this.state.viewport} />
          {isAuthenticated && <DataInputLayout ref='dataInput'
            map={this.state.map} mapClickHandler={this.mapClickHandler} />}
        </div>
        <FeatureList />

      </div>
    )
  }

  componentDidMount () {
    mapboxgl.accessToken = this.state.mapToken
    var map = new mapboxgl.Map(this.state.mapView)
    map.addControl(new mapboxgl.Navigation())
    baseLayerandSource(map, this.state.tileLocation)
    // if (typeof city !== 'undefined') {
    // let tempList = {};
    let requestString = 'http://geonode.urbinsight.com/geoserver/rest/workspaces/' +
      `${this.state.city}/featuretypes.json`

    fetch(requestString, {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
      .then((response) => response.json())
      .then(function (fullList) {
        var sortedArray = _.sortBy(fullList.featureTypes.featureType, function(o) { return o.name })
        return sortedArray
      })
      .then((layerList) => this.setState({layerList: layerList}))
    // }
    let userUploadRequestString = 'http://geonode.urbinsight.com/geoserver/rest/workspaces/geonode/featuretypes.json'
    fetch(userUploadRequestString, {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
      .then((response) => response.json())
      .then(function (fullList) {
        var sortedArray = _.sortBy(fullList.featureTypes.featureType, function(o) { return o.name })
        return sortedArray
      })
      .then((layerList) => this.setState({userLayerList: layerList}))
    this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
    this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
    // this.mapClickHandler('featureSelection',
    //   {audits: this.props.audits, surveyDelete: this.props.surveyDelete, surveyUpdate: this.props.surveyUpdate}
    // )
    map.on('dragend', (e) => {
      this.props.surveysFetch(boundsArrayGenerator(map.getBounds()))
      this.props.auditsFetch(boundsArrayGenerator(map.getBounds()))
      let rawBounds = map.getBounds().toArray()
      this.setState({
        viewport: {
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
          zoom: map.getZoom(),
          width: map.transform.width,
          height: map.transform.height,
          isDragging: false,
          extent: [rawBounds[0][0], rawBounds[0][1], rawBounds[1][0], rawBounds[1][1]]
        }
      })
    })
    this.setState({
      map: map
    })
  }
  componentWillReceiveProps (np) {
    let city = np.locationBeforeTransitions.pathname.slice(1)
    if (this.state.city !== city) {
      let tileLocation = 'http://' + serverEndpoint + ':5001/data/city/lots/' + city + '/{z}/{x}/{y}.mvt'
      this.state.map.setCenter(cityObjectFunc(city))
      this.state.map.removeSource('lots').addSource('lots', {
        'type': 'vector',
        'tiles': [tileLocation]
      })
      this.setState({
        city: city,
        tileLocation: tileLocation
      })
      // this sets the feature list from Geonode but only if the city is different
      if (typeof city !== 'undefined') {
        let requestString = 'http://geonode.urbinsight.com/geoserver/rest/workspaces/' +
          `${this.state.city}/featuretypes.json`
          fetch(requestString, {method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default'})
            .then((response) => response.json())
            .then(function (layerList) {
              var sortedArray = _.sortBy(layerList.featureTypes.featureType, function(o) {return o.name; })
              return sortedArray
            })
            .then((layerList) => this.setState({layerList: layerList}))
      }
    }
  }

  componentWillUpdate (np, ns) {
    // This Complexity is based on the following conditions for calling the featureSelection mapClickHandler
    // if the User is logged in, and (the dataInput window isn't open and more audits or servers are present
    // in the cache or  audits and surveys are empty (initialState).
    if (this.refs.dataInput) {
      if (!this.refs.dataInput.state.opened) {
        if ((np.audits.length !== this.props.audits.length || np.surveys.length !== this.props.surveys.length ||
        (this.props.layers.length !== np.layers.length) || (!this.props.audits.length && !this.props.surveys.length))) {
          this.mapClickHandler('featureSelection',
            {audits: np.audits, surveyDelete: np.surveyDelete, surveyUpdate: np.surveyUpdate, layers: np.layers}
          )
        }
      }
    // If not Logged in if audits or surveys have been added to the cache of both are empty (initialState)
    } else if ((np.audits.length !== this.props.audits.length || np.surveys.length !== this.props.surveys.length) ||
    (!this.props.audits.length && !this.props.surveys.length) || (this.props.layers.length !== np.layers.length)) {
      this.mapClickHandler('featureSelection',
        {audits: np.audits, surveyDelete: np.surveyDelete, surveyUpdate: np.surveyUpdate, layers: np.layers}
      )
    }

    typeof ns.map.getSource('surveys') !== 'undefined'
      ? ns.map.getSource('surveys').setData(surveyGeoJSONCompiler(np.surveys))
      : null
    // IDEA: Refactor to not include a side effect of adding it to the map
    auditGeoJSONCompiler(np.audits, ns.map)
  }

  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
  }

  mapClickHandler (keyword, options) {
    let audits = options && options.audits ? options.audits : this.props.audits
    let layers = options && options.layers ? options.layers : this.props.layers
    this.state.map
      ? keyword === 'featureSelection'
        ? mapClickHandlerSwitcher(this.state.map, keyword,
          {audits: audits, layers: layers,
            surveyDelete: this.props.surveyDelete, surveyUpdate: this.props.surveyUpdate})
        : mapClickHandlerSwitcher(this.state.map, keyword, options)
      : null
  }
}

const mapStateToProps = (state) => {
  const { auth, survey, audit, layer, router } = state
  const { audits } = audit
  const { surveys } = survey
  const { isAuthenticated, errorMessage } = auth
  const { layers } = layer
  const { locationBeforeTransitions } = router
  return {
    isAuthenticated,
    errorMessage,
    surveys,
    audits,
    layers,
    locationBeforeTransitions
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
      dispatch(deleteSurvey(id))
    },
    surveyUpdate: (responses) => {
      dispatch(updateSurvey(responses))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
