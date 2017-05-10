const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    uuid: String,
    username: {
        type: String,
        required: true
    },
    password: String,
    role: {
        type: String,
        default: "user"
    },
    email: String,
    token: String
}) // userSchema

let User = mongoose.model('User', userSchema)
module.exports = User