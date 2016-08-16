var Koa = require('koa')
var app = new Koa()
var auth = require('./api/src/methods/auth')
var survey = require('./api/src/methods/survey')
var audit = require('./api/src/methods/audit')
//var keys = require('./api/keys')
var path = require('path')
var fs = require('fs')
// var cors = require('koa-cors')
//
// var options = {
//   origin: '*'
// }
// app.use(cors(options))
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
const modelsPath = path.normalize(path.join(__dirname)) + '/api/src/models'
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(modelsPath + '/' + file)
  }
})
//app.keys = keys
app.keys = ["", ""]
// sessions
const convert = require('koa-convert')
const session = require('koa-generic-session')
const MongoStore = require('koa-generic-session-mongo')
var storeObj = {
  key: 'koareactfullexample.sid',
  url: 'mongodb://localhost/urbinsight'
}

// cors
const cors = require('koa-cors')
app.use(cors({origin: '*'}))
// csrf
// const csrf = require('koa-csrf')
// csrf(app)
// app.use(convert(csrf.middleware))
const passport = require('koa-passport')

require('./config/passport')(passport)
app.use(convert(session({
  store: new MongoStore(storeObj)
})))

// bodyParser
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(passport.initialize())
app.use(passport.session())

router
  // .get('/', function * () {
  // //  await next();
  //   this.body = 'hello koa'
  // })
  .get('/api/surveys', survey.getSurveys)
  .get('/api/audits', audit.getAudits)
  .del('/api/survey/:id', survey.deleteSurvey)
  .post('/api/sessions/create', auth.signIn)
  .post('/api/user/create', auth.createUser)
  .post('/api/survey/create', survey.saveSurvey)
  .post('/api/audit/create', audit.saveAudit)
  .put('/api/survey/:id', survey.updateSurvey)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)
