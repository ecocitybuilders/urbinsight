// /**
//   *Schema for Users
// */

'use strict'
var bcrypt = require('../../../lib/bcrypt-thunk') // version that supports yields
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var co = require('co')
var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: false},
  profile: {} // for extra information
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
userSchema.pre('save', function (done) {
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
userSchema.methods.comparePassword = function * (candidatePassword) {
  return yield bcrypt.compare(candidatePassword, this.password)
}

/**
 * Statics
 */

userSchema.statics.passwordMatches = function * (username, password) {
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
mongoose.model('User', userSchema)
