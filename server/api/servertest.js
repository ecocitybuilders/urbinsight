var Koa = require('koa')
var app = new Koa()
var auth = require('./src/methods/auth')
var path = require('path')
var fs = require('fs')

var root = path.normalize(path.join(__dirname))
// trust proxy
app.proxy = true

var router = require('koa-router')()

// MongoDB
const mongoose = require('mongoose')
const developmentDb = 'mongodb://localhost/urbinsight'
mongoose.connect(developmentDb)
mongoose.connection.on('error', function (err) {
  console.log(err)
})
// Load the models
const modelsPath = root + '/src/models'
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(modelsPath + '/' + file)
  }
})

app.keys = ['your-session-secret', 'another-session-secret']
// sessions
const convert = require('koa-convert')
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')
var storeObj = {
  key: 'koareactfullexample.sid',
  url: 'mongodb://localhost/urbinsight'
}

// csrf
const csrf = require('koa-csrf')
csrf(app)
app.use(convert(csrf.middleware))

// authentication
// require('./src/methods/auth')
const passport = require('koa-passport')

require('../config/passport')(passport)
app.use(convert(session({
  store: new MongoStore(storeObj)
})))

// bodyParser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(passport.initialize())
app.use(passport.session())
// function * (next) {
//   console.log('here')
//   // var body = yield parse(this, { limit: '1kb' })
//   passport.authenticate('local', {
//     successRedirect: '/medellin',
//     failureRedirect: '/budapest'
//   })
// }
router
  .get('/', function * () {
  //  await next();
    this.body = 'hello koa'
  })
  .post('/api/sessions/create', auth.signIn)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)
// const db = mongoose.connection
//
// db.on('error', console.error.bind(console, 'connection error:'))
// // Open the connection
// db.once('open', function callback () {
//   console.log('Database Connection Successfully Opened at ' +
//    developmentDb)
// })
//

// var session = require('koa-session')
// app.keys = ['secret']
// app.use(session(app))
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
