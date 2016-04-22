// /**
//   *Schema for Users
// */
//
// var mongoose = require('mongoose')
// var bcrypt = require('bcrypt')
// var Schema = mongoose.Schema
//
// // Define the User Schema
//
// var userSchema = new Schema({
//   username: {type: String, required: true},
//   email: {type: String, required: true},
//   password: {type: String, required: true},
//   role: {type: String, required: false},
//   profile: {} // for extra information
// })
//
// // A method that's called every time a document is saved..
// userSchema.pre('save', function (next) {
//   var user = this
//   if (!user.isModified('password')) {
//     return next()
//   }
// // generate salt
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//       return next(err)
//     }
//     // Create a Hash and store it
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) {
//         return next(err)
//       }
//       user.password = hash
//       next()
//     })
//   })
// })
//
// userSchema.methods.comparePassword = function (triedPassword, cb) {
//   bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
//     if (err) return cb.err
//     cb(null, isMatch)
//   })
// }
//
// // The primary user model
//
// module.exports = mongoose.model('User', userSchema)

'use strict'
var bcrypt = require('../../../lib/bcrypt-thunk') // version that supports yields
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var co = require('co')

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.password
    }
  }
})

/**
 * Middlewares
 */
UserSchema.pre('save', function (done) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return done()
  }

  co.wrap(function * () {
    try {
      var salt = yield bcrypt.genSalt()
      var hash = yield bcrypt.hash(this.password, salt)
      this.password = hash
      done()
    } catch (err) {
      done(err)
    }
  }).call(this).then(done)
})

/**
 * Methods
 */
UserSchema.methods.comparePassword = function * (candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password)
}

/**
 * Statics
 */

UserSchema.statics.passwordMatches = function * (username, password) {
  var user = yield this.findOne({ username: username.toLowerCase() }).exec()
  if (!user) {
    throw new Error('User not found')
  }

  if (yield user.comparePassword(password)) {
    return user
  }

  throw new Error('Password does not match')
}

// Model creation
mongoose.model('User', UserSchema)
