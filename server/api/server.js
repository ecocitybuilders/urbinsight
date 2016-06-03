var Koa = require('koa')
var app = new Koa()
var auth = require('./src/methods/auth')
var survey = require('./src/methods/survey')
var audit = require('./src/methods/audit')
var keys = require('./keys')
var path = require('path')
var fs = require('fs')

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
const modelsPath = path.normalize(path.join(__dirname)) + '/src/models'
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(modelsPath + '/' + file)
  }
})

app.keys = keys
// sessions
const convert = require('koa-convert')
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')
var storeObj = {
  key: 'koareactfullexample.sid',
  url: 'mongodb://localhost/urbinsight'
}

// csrf
// const csrf = require('koa-csrf')
// csrf(app)
// app.use(convert(csrf.middleware))
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
  // .get('/', function * () {
  // //  await next();
  //   this.body = 'hello koa'
  // })
  .get('/api/surveys', survey.getSurveys)
  .get('/api/audits', audit.getAudits)
  .post('/api/sessions/create', auth.signIn)
  .post('/api/user/create', auth.createUser)
  .post('/api/survey/create', survey.saveSurvey)
  .post('/api/audit/create', audit.saveAudit)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)
