/**
  Schema for Audit
*/
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AuditSchema = new Schema({
  'type': { type: String, default: 'Feature' },
  'geometry': {
    'type': { type: String, default: 'Polygon' },
    'coordinates': { type: Array, default: [0, 0] }
  },
  properties: {
    sourceInformation: {
      author: String,
      date: { type: Date, default: Date.now },
      neighborhoodID: Number,
      timeHorizon: Number
    },
    parcelIdentification: {
      'parcelType': { type: String, default: 'Generic Parcel' },
      'designatedLandUse': { type: String, default: 'Residential' },
      'actualLandUse': { type: String, default: 'Residential' },
      'landArea': { type: Number, default: 0 },
      'buildingFootprint': { type: Number, default: 0 }
    },
    buildingData: {
      'buildingAttachmentType': { type: String, default: 'Single Family' },
      'numberOccupiedDwellingUnits': { type: Number, default: 0 },
      'buildingAge': { type: Number, default: 0 },
      'aboveGroundStories': { type: Number, default: 0 },
      'belowGroundStories': { type: Number, default: 0 },
      'interiorFloorSpace': { type: Number, default: 0 },
      'separateDwellingUnits': { type: Number, default: 0 },
      'foundationType': { type: String, default: 'Slab-on-Grade' },
      'wallType': { type: String, default: 'Solid Masonry' },
      'roofType': { type: String, default: 'Peaked Hard Surface' }
    },
    demographics: {
      'seniors': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      },
      'adults': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      },
      'youth': {
        'livingWorking': { type: Number, default: 0 },
        'livingOffWorking': { type: Number, default: 0 },
        'visitingWork': { type: Number, default: 0 },
        'visitingPartTimeWork': { type: Number, default: 0 }
      }
    },
    workbooks: {
      water: {
        data: {
          landCoverPreCalc: {},
          demandJunctions: {}
        }
      },
      materials: {
        option: { type: String },
        data: {}
      }
    }
  }

})

mongoose.model('Audit', AuditSchema)
