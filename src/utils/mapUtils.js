import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import UMISPopUp from 'containers/UMISPopUp'
import SurveyPopUp from 'components/SurveyPopUp'

export function baseLayerandSource (map, tileLocation) {
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
  map.on('style.load', function () {
    map.addSource('lots', {
      'type': 'vector',
      'tiles': [tileLocation]
    })
    map.addLayer({
      'id': 'lots',
      'type': 'fill',
      'source': 'lots',
      'source-layer': 'parcels',
      'layout': {
        'visibility': 'visible'
      },
      'interactive': true,
      'paint': {
        'fill-color': '#ff0000',
        'fill-opacity': 0.5,
        'fill-outline-color': '#ffffff'
      }
    })

    map.addSource('surveys', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    })
    map.addLayer({
      'id': 'surveys',
      'type': 'circle',
      'source': 'surveys',
      'paint': {
        'circle-radius': 5,
        'circle-color': '#ec9918'
      }
    })
    map.addSource('auditPoints', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    })
    map.addLayer({
      'id': 'auditPoints',
      'type': 'circle',
      'source': 'auditPoints',
      'paint': {
        'circle-radius': 5,
        'circle-color': '#e022d9'
      }
    })
    map.addSource('auditPolygons', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': []
      }
    })
    map.addLayer({
      'id': 'auditPolygons',
      'type': 'fill',
      'source': 'auditPolygons',
      'layout': {
        'visibility': 'visible'
      },
      'interactive': true,
      'paint': {
        'fill-color': '#e022d9',
        'fill-opacity': 1,
        'fill-outline-color': '#ffffff'
      }
    })
    map.addLayer({
      'id': 'lots-hover',
      'type': 'fill',
      'source': 'lots',
      'source-layer': 'parcels',
      'layout': {},
      'paint': {
        'fill-color': '#590303',
        'fill-opacity': 0.5
      },
      'filter': ['==', 'id_lote', '']
    })
    map.addSource('point', {
      'type': 'geojson',
      'data': geojson
    })
    map.addLayer({
      'id': 'point',
      'type': 'circle',
      'source': 'point',
      'paint': {
        'circle-radius': 5,
        'circle-color': '#29b381'
      }
    })
  })
}

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
    resource.forEach(function (audit) {
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
      if (['auditPoints', 'auditPolygons', 'surveys'].indexOf(feature.layer.id) < 0) {
      } else {
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
              'circle-radius': 5,
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
            'circle-radius': 5,
            'circle-color': '#29b381'
          }
        })
      }
      options.updateValues(e.lngLat.lat, e.lngLat.lng)
    }
  })
}

export function mapboxStyleGenerator (sldObj, layerName) {
  let mapboxStyleObjs = []
  sldObj.namedLayers.map((layer) => {
    layer.userStyles.forEach((style) => {
      let styleSpec = {}
      styleSpec['source'] = layerName
      styleSpec['id'] = layerName
      let dataDriven
      let propertyValue
      let paintType
      let stops = []
      style.rules.forEach((rule) => {
        dataDriven = rule.filter !== null
        propertyValue = rule.filter.property
        rule.symbolizers.forEach((symbolizer) => {
          let styleType
          if (symbolizer.CLASS_NAME.split('.').indexOf('Point') > -1) {
            styleType = 'point'
          } else if (symbolizer.CLASS_NAME.split('.').indexOf('Line') > -1) {
            styleType = 'line'
          } else if (symbolizer.CLASS_NAME.split('.').indexOf('Polygon') > -1) {
            styleType = 'polygon'
          }
          switch (styleType) {
            case 'point':
              styleSpec['type'] = 'circle'
              if (dataDriven) {
                paintType = 'circle-radius'
                stops.push([rule.filter.value, symbolizer.fillColor.substring(0, 7)])
              } else {
                styleSpec['paint'] = {
                  'circle-radius': symbolizer.pointRadius,
                  'circle-color': symbolizer.fillColor.substring(0, 7)
                }
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
              if (dataDriven) {
                paintType = 'fill-color'
                stops.push([rule.filter.value, symbolizer.fillColor.substring(0, 7)])
              } else {
                styleSpec['paint'] = {
                  'fill-color': symbolizer.fillColor.substring(0, 7),
                  'fill-opacity': 0.8
                }
                if (typeof symbolizer.strokeColor !== 'undefined') {
                  styleSpec.paint['fill-outline-color'] = symbolizer.strokeColor || '#000000'
                }
              }
              break
          }
        })
      })
      if (dataDriven) {
        styleSpec.paint = {}
        styleSpec.paint[paintType] = {}
        styleSpec.paint[paintType]['property'] = propertyValue
        styleSpec.paint[paintType]['stops'] = stops.reverse()
      }
      debugger
      mapboxStyleObjs.push(styleSpec)
    })
  })
  return mapboxStyleObjs
}
