'use strict'
var express = require('express')
var router = express.Router()
var devConString = require('../../database').devConString
var prodConString = require('../../database').prodConString
var pg = require('pg')
var SphericalMercator = require('sphericalmercator')
var mapnik = require('mapnik')
var zlib = require('zlib')
var bboxpolygon = require('turf-bbox-polygon')

var conString = process.env.NODE_ENV === 'development' ? devConString : prodConString
mapnik.register_default_fonts()
mapnik.register_default_input_plugins()

var mercator = new SphericalMercator({
  size: 256
})

var toGeoJSON = function (json) {
  var geojson = {type: 'FeatureCollection', features: []}
  json.forEach(function (feature) {
    var obj = {
      'type': 'Feature',
      'properties': JSON.parse(JSON.stringify(feature.properties)),
      // "properties": {},
      'geometry': JSON.parse(feature.geojson)
    }
    geojson.features.push(obj)
  })
  return geojson
}
// 'attributes': ['cobama', 'subtipo_lo', 'tipo_lote', 'estrato', 'zona', 'usopredial', 'npisos', 'calificacion']

var configObject = {
  'medellin': {
    'attributes': ['cobama']
  },
  'lima': {
    'attributes': ['objectid', 'id_lote', 'tip_uso', 'id_dist', 'estado']
  },
  'budapest': {
    'attributes': ['id', 'tags']
  },
  'cusco': {
    'attributes': ['gid_1', 'usuario', 'area']
  },
  'abu_dhabi': {
    'attributes': ['plotid', 'calculated']
  }
}

router.get('/:cityName/:z/:x/:y.mvt', function (req, res) {
  var cityName = req.params.cityName
  var amendedCityName = cityName === 'abu_dhabi' ? 'abudhabi' : cityName
  var bbox = mercator.bbox(
      +req.params.x,
      +req.params.y,
      +req.params.z,
      false,
      '4326'
      )

  var poly = JSON.stringify(bboxpolygon(bbox).geometry)
  var bounds = 'ST_SetSRID(ST_GeomFromGeoJSON(\'' + poly + '\'), 4326)'
  var sql = 'select st_asgeojson(wkb_geometry) as geojson, row_to_json((select l from (select ' +
    configObject[cityName]['attributes'].join(', ') + ' ) as l )) as properties from ' + amendedCityName + '_parcels'
  sql += ' where st_intersects(wkb_geometry, ' + bounds + ')'

  pg.connect(conString, function (err, client, done) {
    var handleError = function (err) {
      // no error occurred, continue with the request
      if (!err) return false
      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if (client) {
        done(client)
      }
      console.log("i'm the error")
      console.log(err)
      res.writeHead(500, {'content-type': 'text/plain'})
      res.end('An error occurred')
      return true
    }
    if (err) handleError(err)
    // handle an error from the connection
    // if(handleError(err)) return console.error('error running query', err);
    if (cityName === 'medellin' || cityName === 'lima' ||
        cityName === 'budapest' || cityName === 'cusco' || cityName === 'abu_dhabi') {
      client.query(sql, [], function (err, result) {
        done()
        if (err) {
          res.end()
          return console.error('error running query', err)
        }
        let data
        if (result.rows.length) {
          data = result.rows
        } else {

          data = {}
        }
        var vtile = new mapnik.VectorTile(+req.params.z, +req.params.x, +req.params.y)
        try {
          // The second name is the name of the sub layer that must be accessed in GL
          vtile.addGeoJSON(JSON.stringify(toGeoJSON(result.rows)), 'parcels')
        } catch (e) {
          console.log(e)
        }
        res.setHeader('Content-Encoding', 'gzip')
        res.setHeader('Content-Type', 'application/x-protobuf')
        zlib.gzip(vtile.getData(), function (err, pbf) {
          if (err) console.error(err)
          res.send(pbf)
        })
      })
    }
  })
})

// router.get('/lot/:cityName/', function(req, res){
//   client.query("select * from " + cityName +
//  "-parcels WHERE ST_CONTAINS(wkb_geometry, ST_SetSRID(ST_MakePoint(" + req.query.lng +
//     "," + req.query.lat + "), 4326)", function(err, result){
//     if (err){
//       console.log('there has been an error');
//     }
//     console.log(result);
//     res.sendStatus(200);
//   });
// });

module.exports = router
