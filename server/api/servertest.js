'use strict'

var Koa = require('koa')
var app = new Koa()
var router = require('koa-router')()
var parse = require('co-body')

// body parser
// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser())

// var session = require('koa-session')
// app.keys = ['secret']
// app.use(session(app))
// sessions
const convert = require('koa-convert')
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')

app.keys = ['your-session-secret', 'another-session-secret']
app.use(convert(session({
  store: new MongoStore()
})))
//
// User.findOne({ username: 'heyheyhey@gmail.com' }, function (err, user) {
//   if (err) { throw err }
//   console.log("do I even get called")
//   if (!user) {
//     console.log('User did not exist; creating test user...')
//     user = new User({
//       username: 'heyheyhey@gmail.com',
//       password: 'shadow1'
//     })
//     user.save()
//   }
// })

require('./src/methods/auth.js')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

router
  .get('/', function * () {
  //  await next();
    this.body = 'hello koa'
  })
  .post('/api/sessions/create', function * (next) {
    // this.body = {
    //   id_token: 1000
    // }
    var body = yield parse(this, { limit: '1kb' })
    passport.authenticate('local', {
      successRedirect: '/medellin',
      failureRedirect: '/budapest'
    })
  })

app.use(router.routes())
app.use(router.allowedMethods())

// app.use(function * (next) {
//   if (this.method !== 'POST') {
//     return yield next
//   }
//   this.body = {
//     id_token: 1000
//   }
// })
// app.use(function * (next) {
//   this.body = `you're hear but something unexpected happened`
// })
app.listen(8000)
