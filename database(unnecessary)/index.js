const mongoose = require('mongoose')

const developmentDb = 'mongodb://localhost/urbinsight'

mongoose.connect(developmentDb)

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at ' +
   developmentDb)
})

exports.db = db
