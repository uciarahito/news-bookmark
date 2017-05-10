const mongoose = require('mongoose')
let Schema = mongoose.Schema

let questionSchema = new Schema({
    question: String,
    answer: String,
    status: false
}) // questionSchema

let Question = mongoose.model('Question', questionSchema)
module.exports = Question