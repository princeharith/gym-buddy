const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

//a schema defines the shape of the docs within this collection
const userSchema = new Schema({
  username: String,
  password: String
})

//hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
//checking if password is valid
userSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.password);
};


let User = mongoose.model('users-test', userSchema);
module.exports = User;

