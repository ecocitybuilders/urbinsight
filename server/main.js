import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))))
  // var auth = require('./api/src/methods/auth')
  // var survey = require('./api/src/methods/survey')
  // var audit = require('./api/src/methods/audit')
  // var keys = require('./api/keys')
  // var path = require('path')
  // var fs = require('fs')
  //
  // // trust proxy
  // app.proxy = true
  //
  // var router = require('koa-router')()
  //
  // // MongoDB
  // const mongoose = require('mongoose')
  // const developmentDb = 'mongodb://localhost/urbinsight'
  // mongoose.connect(developmentDb)
  // mongoose.connection.on('error', function (err) {
  //   console.log(err)
  // })
  // // Load the models
  // const modelsPath = path.normalize(path.join(__dirname)) + '/api/src/models'
  // fs.readdirSync(modelsPath).forEach(function (file) {
  //   if (~file.indexOf('js')) {
  //     require(modelsPath + '/' + file)
  //   }
  // })
  //
  // app.keys = keys
  // // sessions
  // // const convert = require('koa-convert')
  // const session = require('koa-generic-session')
  // const MongoStore = require('koa-generic-session-mongo')
  // var storeObj = {
  //   key: 'koareactfullexample.sid',
  //   url: 'mongodb://localhost/urbinsight'
  // }
  //
  // // csrf
  // // const csrf = require('koa-csrf')
  // // csrf(app)
  // // app.use(convert(csrf.middleware))
  // const passport = require('koa-passport')
  //
  // require('./config/passport')(passport)
  // app.use(convert(session({
  //   store: new MongoStore(storeObj)
  // })))
  //
  // // bodyParser
  // const bodyParser = require('koa-bodyparser')
  // app.use(bodyParser())
  //
  // app.use(passport.initialize())
  // app.use(passport.session())
  //
  // router
  //   .get('/api/surveys', survey.getSurveys)
  //   .get('/api/audits', audit.getAudits)
  //   .post('/api/sessions/create', auth.signIn)
  //   .post('/api/user/create', auth.createUser)
  //   .post('/api/survey/create', survey.saveSurvey)
  //   .post('/api/audit/create', audit.saveAudit)
  //
  // app.use(router.routes())
  // app.use(router.allowedMethods())
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  // app.use(convert(serve(paths.base(config.dir_dist))))
}

export default app
