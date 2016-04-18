'use strict'

var koa = require('koa')
var app = new koa()
var router = require('koa-router')();

router
  .get('/', function* () {
  //  await next();
    this.body = 'hello koa';
  })
  .post('/session/create', function* (next) {
    this.body = {
      user: {
        id_token: 1000
      }  
    }
  })

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(8000)
