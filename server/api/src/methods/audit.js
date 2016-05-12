'use strict'

exports.saveAudit = function * () {
  if (!this.request.body) {
    this.throw('The body is empty', 400)
  }

  var Audit = require('mongoose').model('Audit')
  var tempAudit = this.request.body
  tempAudit.geoCoordinates = [
    parseFloat(this.request.body.geoCoordinates[0]),
    parseFloat(this.request.body.geoCoordinates[1])
  ]

  try {
    var audit = new Audit(tempAudit)
    audit = yield audit.save()
  } catch (err) {
    this.throw(err)
  }
  this.status = 200
  this.body = { audit: this.audit }
}

exports.getAudits = function * () {
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
  var Audit = require('mongoose').model('Audit')
  try {
    var audits = yield Audit.find({'geoCoordinates':
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
  this.body = { audits: audits }
}
