'use strict'

var Koa = require('koa')
var app = new Koa()
var router = require('koa-router')()

router
  .get('/', function * () {
  //  await next();
    this.body = 'hello koa'
  })
  .post('/api/sessions/create', function * (next) {
    this.body = {
      id_token: 1000
    }
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
