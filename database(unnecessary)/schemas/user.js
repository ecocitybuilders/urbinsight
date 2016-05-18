/**
  *Schema for Users
*/

var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

// Define the User Schema

var userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: false},
  profile: {} // for extra information
})

// A method that's called every time a document is saved..
userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) {
    return next()
  }
// generate salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }
    // Create a Hash and store it
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (triedPassword, cb) {
  bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb.err
    }
    cb(null, isMatch)
  })
}

// The primary user model

var User = mongoose.model('User', userSchema)

export default User
