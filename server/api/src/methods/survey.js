'use strict'

exports.saveSurvey = function * () {
  if (!this.request.body) {
    this.throw('The body is empty', 400)
  }

  var Survey = require('mongoose').model('Survey')
  try {
    var survey = new Survey({
      user: this.request.body.user,
      geoCoordinates: [
        parseFloat(this.request.body.geoCoordinates[0]),
        parseFloat(this.request.body.geoCoordinates[1])
      ],
      employment: this.request.body.employment,
      healthcare: this.request.body.healthcare,
      family: this.request.body.family,
      stability: this.request.body.stability,
      relationships: this.request.body.relationships,
      recreation: this.request.body.recreation,
      education: this.request.body.education,
      vacation: this.request.body.vacation,
      housing: this.request.body.housing,
      environment: this.request.body.environment,
      discrimination: this.request.body.discrimination,
      religion: this.request.body.religion,
      mobility: this.request.body.mobility,
      movement: this.request.body.movement,
      safety: this.request.body.safety,
      governance: this.request.body.governance
    })
    survey = yield survey.save()
  } catch (err) {
    this.throw(err)
  }
  this.status = 200
  this.body = { survey: survey }
}

exports.getSurveys = function * () {
  let splitLngLat = (str) => {
    return str.split(',')
  }
  // if (!this.request.body) {
  //   this.throw('The body is empty', 400)
  // }
  let coords = [splitLngLat(this.query.a),
                splitLngLat(this.query.b),
                splitLngLat(this.query.c),
                splitLngLat(this.query.d),
                splitLngLat(this.query.a)]
  var Survey = require('mongoose').model('Survey')
  try {
    var surveys = yield Survey.find({'geoCoordinates':
      { $geoWithin:
        { $geometry:
          { type: 'Polygon',
            coordinates: [coords]
          }
        }
      }
    }).exec()
  } catch (err) {
    this.throw(err)
  }
  this.status = 200
  this.body = { surveys: surveys }
}

exports.deleteSurvey = function * () {
  var Survey = require('mongoose').model('Survey')
  console.log(this.params.id)
  Survey.findByIdAndRemove(this.params.id, function (err) {
    if (err) return console.error(err)
  })
  this.status = 200
  this.body = {}
}

exports.updateSurvey = function * () {
  var Survey = require('mongoose').model('Survey')
  yield Survey.findByIdAndUpdate(this.params.id,
    { $set: { geoCoordinates: [
      parseFloat(this.request.body.geoCoordinates[0]),
      parseFloat(this.request.body.geoCoordinates[1])
    ],
          employment: this.request.body.employment,
          healthcare: this.request.body.healthcare,
          family: this.request.body.family,
          stability: this.request.body.stability,
          relationships: this.request.body.relationships,
          recreation: this.request.body.recreation,
          education: this.request.body.education,
          vacation: this.request.body.vacation,
          housing: this.request.body.housing,
          environment: this.request.body.environment,
          discrimination: this.request.body.discrimination,
          religion: this.request.body.religion,
          mobility: this.request.body.mobility,
          movement: this.request.body.movement,
          safety: this.request.body.safety,
          governance: this.request.body.governance

     } }, function (err, survey) {
       if (err) return console.error(err)
       this.status = 200
       this.body = { survey: survey }
     })
}
// This might be more scalable to parseInt here
// var survey = new Survey({
//   user: this.request.body.user,
//   geoCoordinates: [
//     parseFloat(this.request.body.geoCoordinates[0]),
//     parseFloat(this.request.body.geoCoordinates[1])
//   ],
//   employment: parseInt(this.request.body.employment),
//   healthcare: parseInt(this.request.body.healthcare),
//   family: parseInt(this.request.body.family),
//   stability: parseInt(this.request.body.stability),
//   relationships: parseInt(this.request.body.relationships),
//   recreation: parseInt(this.request.body.recreation),
//   education: parseInt(this.request.body.education),
//   vacation: parseInt(this.request.body.vacation),
//   housing: parseInt(this.request.body.housing),
//   environment: parseInt(this.request.body.environment),
//   discrimination: parseInt(this.request.body.discrimination),
//   religion: parseInt(this.request.body.religion),
//   mobility: parseInt(this.request.body.mobility),
//   movement: parseInt(this.request.body.movement),
//   safety: parseInt(this.request.body.safety),
//   governance: parseInt(this.request.body.governance)
// })
