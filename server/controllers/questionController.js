var mongo = require('mongodb')
var Question = require('../models/question')
var methods = {}

methods.insertOne = (req, res, next) => {
    let question = new Question({
        question: req.body.question,
        answer: req.body.answer
    })
    question.save(function(err, record) {
        if (err) return console.error(err);
        res.json(record)
    });
} // insertOne

methods.getAll = (req, res, next) => {
    Question.find()
        .then(records => {
            res.json(records)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getAll Question'
            })
        })
} //getAll

methods.getById = (req, res, next) => {
    Question.findById(req.params.id)
        .then(record => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getById Question'
            })
        })
} // getById

methods.updateById = (req, res, next) => {
    Question.findById(req.params.id)
        .then(record => {
            Question.updateOne({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: {
                        "question": req.body.question || record.question,
                        "answer": req.body.answer || record.answer,
                    }
                })
                .then((record) => {
                    res.json(record)
                })
                .catch(err => {
                    res.json({
                        err,
                        message: 'Error waktu update Question'
                    })
                })
        })
        .catch(err => {
            res.json({
                err,
                message: 'Data tidak ada'
            })
        })
} //updateById

methods.deleteById = (req, res, next) => {
    Question.deleteOne({
            "_id": new mongo.ObjectID(req.params.id)
        })
        .then((record) => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu deleteById Question'
            })
        })
} // deleteById

module.exports = methods