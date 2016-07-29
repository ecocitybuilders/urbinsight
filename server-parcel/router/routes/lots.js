var express = require('express');
var router = express.Router();
var pgClient = require('../../database').pgClient;
var conString = require('../../database').conString;
var pg = require('pg');
var geojsonvt = require('geojson-vt');
var SphericalMercator = require('sphericalmercator');
var mapnik = require('mapnik');
var zlib = require('zlib');
var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');
var bboxpolygon = require('turf-bbox-polygon');
mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

var mercator = new SphericalMercator({
  size: 256
});

var toGeoJSON = function(json) {
  var geojson = {type: "FeatureCollection", features: []}
  json.forEach(function(feature) {
    var obj = {
      "type": "Feature",
      "properties": JSON.parse(JSON.stringify(feature.properties)),
      // "properties": {},
      "geometry": JSON.parse(feature.geojson),
    }
    geojson.features.push(obj)
  })
  return geojson;
};
// 'attributes': ['cobama', 'subtipo_lo', 'tipo_lote', 'estrato', 'zona', 'usopredial', 'npisos', 'calificacion']

    var config_object = {
      'medellin' : {
        'attributes': ['cobama']
      },
      'lima' : {
        'attributes': ['objectid', 'id_lote', 'tip_uso', 'id_dist', 'estado']
      },
      'budapest': {
        'attributes': ['id', 'tags']
      },
      'cusco': {
        'attributes': ['gid_1', 'usuario', 'area']
      },
      'abudhabi' : {
        'attributes': ['plotid', 'calculated']
      }
    };

router.get('/:city_name/:z/:x/:y.mvt', function(req, res) {
  var city_name = req.params.city_name;
  var bbox = mercator.bbox(
      +req.params.x,
      +req.params.y,
      +req.params.z,
      false,
      '4326'
      );

    var poly = JSON.stringify(bboxpolygon(bbox).geometry);
    var bounds = 'ST_SetSRID(ST_GeomFromGeoJSON(\'' + poly + '\'), 4326)'
    var sql = 'select st_asgeojson(wkb_geometry) as geojson, row_to_json((select l from (select ' + config_object[city_name]['attributes'].join(', ') + ' ) as l )) as properties from ' + city_name + "_parcels";
    sql += ' where st_intersects(wkb_geometry, ' + bounds + ')';
    // console.log(sql)
    //client.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.wkb_geometry)::json As geometry, row_to_json((SELECT l FROM (SELECT " + config_object[city_name]['attributes'].join(', ') + " ) As l )) As properties FROM " + city_name + "_parcels As lg WHERE st_intersects(lg.wkb_geometry, st_makeenvelope(" + bbox.toString() + ", 4326) ) ) As f )  As fc", function(err, result){

  pg.connect(conString, function(err, client, done){
    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;
      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        done(client);
      }
      console.log("i'm the error");
      console.log(err);
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };
    // handle an error from the connection
    //if(handleError(err)) return console.error('error running query', err);
    if(city_name === 'medellin' || city_name === 'lima' || city_name === 'budapest' || city_name === 'cusco' || city_name === 'abudhabi'){
      client.query(sql, [], function(err, result) {
        done()
        if(err) {
          res.end();
          return console.error('error running query', err);
        }
        if (result.rows.length) {
          var data = result.rows
        } else {
          var data = {};
        }
        var vtile = new mapnik.VectorTile(+req.params.z, +req.params.x, +req.params.y);
        try {
          // The second name is the name of the sub layer that must be accessed in GL
          vtile.addGeoJSON(JSON.stringify(toGeoJSON(result.rows)), 'parcels');
        } catch (e) {
          console.log(e);
        }
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/x-protobuf');
        zlib.gzip(vtile.getData(), function(err, pbf) {
          res.send(pbf);
        });
      });
    }
  })
});

router.get('/lot/:city_name/', function(req, res){
  client.query("select * from " + city_name + "-parcels WHERE ST_CONTAINS(wkb_geometry, ST_SetSRID(ST_MakePoint(" + req.query.lng +
    "," + req.query.lat + "), 4326)", function(err, result){
    if (err){
      console.log('there has been an error');
    }
    console.log(result);
    res.sendStatus(200);
  });
});

module.exports = router;
