/**
  *Schema for Survey
*/
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SurveySchema = new Schema({
  'user': String,
  'geoCoordinates': { type: Array, default: [0, 0] },
  'employment': String,
  'healthcare': String,
  'family': String,
  'stability': String,
  'relationships': String,
  'recreation': String,
  'education': String,
  'vacation': String,
  'housing': String,
  'environment': String,
  'discrimination': String,
  'religion': String,
  'mobility': String,
  'movement': String,
  'safety': String,
  'governance': String
})

mongoose.model('Survey', SurveySchema)
