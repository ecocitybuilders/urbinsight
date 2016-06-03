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
  this.body = { survey: this.survey }
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
