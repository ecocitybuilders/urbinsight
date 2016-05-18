import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import UMISPopUp from 'containers/UMISPopUp'
import SurveyPopUp from 'components/SurveyPopUp'
import calculateTotals from 'utils/umisUtils'

const cityObject = {
  cusco: [-71.9675, -13.5320],
  medellin: [-75.5812, 6.2442],
  abudhabi: [54.36745, 24.47608],
  lima: [-77.0428, -12.0464],
  budapest: [19.0402, 47.4979]
}

const cityList = ['cusco', 'medellin', 'abudhabi', 'lima', 'budapest']

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
export function cityObjectFunc (city) {
  if (Object.keys(cityObject).indexOf(city) !== -1) {
    return cityObject[city]
  } else {
    return cityObject[cityList[getRandomInt(0, 5)]]
  }
}

export function surveyGeoJSONCompiler (resource, map) {
  let geojson = {
    'type': 'FeatureCollection',
    'features': []
  }
  if (resource) {
    resource.surveys.forEach(function (survey) {
      let obj = {'type': 'Feature',
                 'geometry': {
                   'type': 'Point',
                   'coordinates': survey.geoCoordinates
                 },
                 'properties': {}
               }

      _.forEach(survey, function (value, key) {
        if (key !== 'geoCoordinates') {
          obj.properties[key] = value
        }
      })
      geojson.features.push(obj)
    })
    // console.log(map)
    map.getSource('surveys').setData(geojson)
  }
}
// Create a point and polygon based geojson
// Iterate through the features returned.
// separate them out and then add them to the respective source
// Need to flatten the values into strings before passing them to the source
// So that they could be queried and rendered on click

export function auditGeoJSONCompiler (resource, map) {
  if (resource) {
    let pointGeojson = {
      'type': 'FeatureCollection',
      'features': []
    }
    let polygonGeojson = {
      'type': 'FeatureCollection',
      'features': []
    }
    // Make this functional by using map
    resource.audits.forEach(function (audit) {
      audit.properties.id = audit._id
      if (audit.geometry.type === 'Point') {
        pointGeojson.features.push(audit)
      } else if (audit.geometry.type === 'Polygon') {
        polygonGeojson.features.push(audit)
      }
    })
    map.getSource('auditPolygons').setData(polygonGeojson)
    map.getSource('auditPoints').setData(pointGeojson)
  }
}
export function boundsArrayGenerator (bounds) {
  return [[bounds.getSouthWest().lng, bounds.getSouthWest().lat],
          [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
          [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
          [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
          [bounds.getSouthWest().lng, bounds.getSouthWest().lat]]
}
// switch is the one you are going to
// if keyword is featureSelection then options object needs to contain audits
// otherwise it will need to be cityTag, persistFeatureGeoJSON, saveValues
export function mapClickHandlerSwitcher (map, keyword, options) {
  map.off('click')
  let geojson = {
    'type': 'FeatureCollection',
    'features': [{
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [0, 0]
      }
    }]
  }
  map.on('click', (e) => {
    if (keyword === 'featureSelection') {
      let features = map.queryRenderedFeatures(e.point, {layers: ['auditPoints', 'auditPolygons', 'surveys']})
      if (!features.length) return
      let feature = features[0]
      let popup = new mapboxgl.Popup()
        .setLngLat(map.unproject(e.point))
      if (feature.layer.id === 'auditPoints' || feature.layer.id === 'auditPolygons') {
        // this should be sent through redux most likely
        // Array of Audits currently in the state
        options.audits.forEach(function (audit) {
          if (audit._id === feature.properties.id) feature = audit; return
        })
        let div = document.createElement('div')
        // Create an Document Element, then will use render to attach the React Node to it.
        calculateTotals(feature.properties)
        popup.setDOMContent(div)
        render(<UMISPopUp totalDemand={feature.properties.totalDemand}/>, div, () => {
          popup.addTo(map)
        })
      } else {
        let div = document.createElement('div')
        popup.setDOMContent(div)
        render(<SurveyPopUp survey={feature.properties}/>, div, () => {
          popup.addTo(map)
        })
      }
    } else if (keyword === 'umisLocation') {
      let cityTag = options.cityTag
      // Check if a feature exists in the parcel map
      let feature = map.queryRenderedFeatures(e.point, {layers: ['lots']})
      // If Yes
      if (feature.length > 0) {
        // Set the point source to be empty if its not undefined
        if (typeof map.getSource('point') !== 'undefined') {
          map.getSource('point').setData(geojson)
        }
        // Set the filter to be Selected
        map.setFilter('lots-hover', ['==', cityTag, feature[0].properties[cityTag]])
        // Get selected feature geojson
        let featureGeoJSON = feature[0].toJSON()
        // I should probably only persist the feature on save instead of here
        // Save Feature
        options.persistFeatureGeoJSON(featureGeoJSON)
      } else {
        // Blank out filter
        map.setFilter('lots-hover', ['==', cityTag, ''])
        // set default geoJSON feature coordinates
        geojson.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
        // If the the point layer doesn't already exist add it
        map.getSource('point').setData(geojson)
        if (typeof map.getLayer('point') === 'undefined') {
          map.addLayer({
            'id': 'point',
            'type': 'circle',
            'source': 'point',
            'paint': {
              'circle-radius': 10,
              'circle-color': '#29b381'
            }
          })
        }
      }
      options.saveValues({geoCoordinates: [e.lngLat.lng, e.lngLat.lat]})
    } else if (keyword === 'surveyLocation') {
      geojson.features[0].geometry.coordinates = [e.lngLat.lng, e.lngLat.lat]
      map.getSource('point').setData(geojson)
      if (typeof map.getLayer('point') === 'undefined') {
        map.addLayer({
          'id': 'point',
          'type': 'circle',
          'source': 'point',
          'paint': {
            'circle-radius': 10,
            'circle-color': '#29b381'
          }
        })
      }
      options.updateValues(e.lngLat.lat, e.lngLat.lng)
    }
  })
}
