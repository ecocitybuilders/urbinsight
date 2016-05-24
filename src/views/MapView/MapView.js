import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DataInputLayout from 'layouts/DataInputLayout/DataInputLayout'
import DataDashboardLayout from 'layouts/DataDashboardLayout/DataDashboardLayout'
import LayerSelection from 'layouts/LayerSelectionLayout/LayerSelection'
// import UMISPopUp from 'containers/UMISPopUp'
import { connect } from 'react-redux'
import { requestSurveys } from 'redux/modules/survey'
import { requestAudits } from 'redux/modules/audit'
import { cityObjectFunc, surveyGeoJSONCompiler, auditGeoJSONCompiler, boundsArrayGenerator } from 'utils/mapUtils'
import { mapClickHandlerSwitcher, baseLayerandSource } from 'utils/mapUtils'

type Props = {
  isAuthenticated: PropTypes.bool,
  surveysFetch: PropTypes.func,
  auditsFetch: PropTypes.func,
  audits: PropTypes.object,
  surveys: PropTypes.object
}

class MapView extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      mapToken: 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA',
      mapView: {
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: cityObjectFunc(window.location.pathname.slice(1)),
        zoom: 15
      },
      city: window.location.pathname.slice(1),
      layerList: []
    }
  }
  render () {
    const { isAuthenticated, audits, surveys } = this.props
    return (
      <div id='mapContainer'>
        <div id='map'>
          <LayerSelection map={this.state.map} city={this.state.city} layerList={this.state.layerList}/>
          <DataDashboardLayout audits={audits} surveys={surveys} />
          {isAuthenticated && <DataInputLayout map={this.state.map} audits={audits}/>}
        </div>
      </div>
    )
  }
  componentDidMount () {
    let tileLocation = 'http://localhost:5001/data/city/lots/' + this.state.city + '/{z}/{x}/{y}.mvt'
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
    this.setState({map: map})
  }
  componentWillUpdate (np, ns) {
    if (np.audits) mapClickHandlerSwitcher(ns.map, 'featureSelection', {audits: np.audits.audits})
    surveyGeoJSONCompiler(np.surveys, ns.map)
    auditGeoJSONCompiler(np.audits, ns.map)
  }
  componentWillUnmount () {
    if (this.state.map) this.state.map.remove()
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode())
  }
}
// Audits change test
const mapStateToProps = (state) => {
  const { auth, survey, audit } = state
  const { audits } = audit
  const { surveys } = survey
  const { isAuthenticated, errorMessage } = auth
  return {
    isAuthenticated,
    errorMessage,
    surveys,
    audits
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    surveysFetch: (bounds) => {
      dispatch(requestSurveys(bounds))
    },
    auditsFetch: (bounds) => {
      dispatch(requestAudits(bounds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
