import _ from 'lodash'
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
    map.getSource('surveys').setData(geojson)
  }
}
export function auditGeoJSONCompiler (resource, map) {
  let geojson = {
    'type': 'FeatureCollection',
    'features': []
  }
  let auditedGeoJSON = {
    'type': 'FeatureCollection',
    'features': []
  }
  if (resource) {
    resource.audits.forEach(function (audit) {
      // if (typeof audit.feature === 'undefined') {
        let obj = {'type': 'Feature',
                   'geometry': {
                     'type': 'Point',
                     'coordinates': audit.geoCoordinates
                   },
                   'properties': {}
                 }
        _.forEach(audit, function (value, key) {
          if (key !== 'geoCoordinates') {
            obj.properties[key] = value
          }
        })
        geojson.features.push(obj)
      // } else {
      //   auditedGeoJSON.features.push(audit.feature)
      // }
    })
    // console.log(geojson)
    // console.log(auditedGeoJSON)
    map.getSource('audits').setData(geojson)
    // map.getSource('auditedLots').setData(auditedGeoJSON)
  }
}
export function boundsArrayGenerator (bounds) {
  return [[bounds.getSouthWest().lng, bounds.getSouthWest().lat],
          [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
          [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
          [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
          [bounds.getSouthWest().lng, bounds.getSouthWest().lat]]
}
