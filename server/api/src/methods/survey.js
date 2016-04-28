'use strict'

exports.saveSurvey = function * () {
  if (!this.request.body) {
    this.throw('The body is empty', 400)
  }

  var Survey = require('mongoose').model('Survey')

  try {
    var survey = new Survey({
      lat: this.request.body.lat,
      lon: this.request.body.lon,
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
    // survey = {}
  } catch (err) {
    this.throw(err)
  }

  this. status = 200
  this.body = { survey: this.survey }
}
