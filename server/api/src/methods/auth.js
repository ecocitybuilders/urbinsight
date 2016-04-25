// const passport = require('koa-passport')
// // const bcrypt = require('bcrypt')
// const User = require('../models/user.js')
//
// User.findOne({ username: 'heyheyhey@gmail.com' }, function (err, user) {
//   if (err) { throw err }
//   if (!user) {
//     console.log('User did not exist creating test user...')
//     user = new User({
//       username: 'heyheyhey1@gmail.com',
//       password: 'shadow1'
//     })
//     console.log(user)
//     user.save()
//   }
// })
//
// passport.serializeUser(function (user, done) {
//   done(null, user._id)
// })
//
// passport.deserializeUser(function (id, done) {
//   User.findById(id, done)
// })
//
// const LocalStrategy = require('passport-local').Strategy
// passport.use(new LocalStrategy(function (username, password, done) {
//   console.log(username, 'LocalStrategy')
//   User.findOne({ username: username }, function (err, user) {
//     if (err) return done(err)
//     if (!user) return done(null, false, { message: 'Incorrect username.' })
//     user.comparePassword(password, function (err, isMatch) {
//       if (err) { throw err }
//       if (isMatch) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Incorrect password.' })
//       }
//     })
//   })
// }))

'use strict'
var passport = require('koa-passport')

exports.signIn = function * () {
  var _this = this
  yield * passport.authenticate('local', function * (err, user, info) {
    if (err) {
      throw err
    }
    if (user === false) {
      _this.status = 401
    } else {
      yield _this.login(user)
      _this.body = { user: user }
    }
  }).call(this)
}

exports.getCurrentUser = function * () {
  if (this.passport.user) {
    this.body = { user: this.passport.user }
  }
  this.status = 200
}

exports.signOut = function * () {
  this.logout()
  this.session = null
  this.status = 204
}

exports.createUser = function * () {
  if (!this.request.body) {
    this.throw('The body is empty', 400)
  }

  if (!this.request.body.username) {
    this.throw('Missing username', 400)
  }
  if (!this.request.body.password) {
    this.throw('Missing password', 400)
  }

  var User = require('mongoose').model('User')

  try {
    var user = new User({ username: this.request.body.username, password: this.request.body.password })
    user = yield user.save()
    yield this.login(user)
  } catch (err) {
    this.throw(err)
  }

  this.status = 200
  this.body = { user: this.passport.user }
}
