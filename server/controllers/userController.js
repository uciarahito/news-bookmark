const mongo = require('mongodb')
const User = require('../models/user')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
var methods = {}
require('dotenv').config();

methods.insertOne = (req, res, next) => {
    let pwdHash = req.body.password
    let user = new User({
        username: req.body.username,
        password: passwordHash.generate(pwdHash)
    })
    user.save(function(err, record) {
        if (err) return console.error(err);
        res.json(record)
    });
} // insertOne

methods.getAll = (req, res, next) => {
    User.find()
        .then(records => {
            res.json(records)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getAll User'
            })
        })
} //getAll

methods.getById = (req, res, next) => {
    User.findById(req.params.id)
        .then(record => {
            res.json(record)
        })
        .catch(err => {
            res.json({
                err,
                message: 'Error waktu getById User'
            })
        })
} // getById

methods.updateById = (req, res, next) => {
    let pwdHash = req.body.password
    User.findById(req.params.id)
        .then(record => {
            User.updateOne({
                    "_id": new mongo.ObjectID(req.params.id)
                }, {
                    $set: {
                        "username": req.body.username || record.username,
                        "password": passwordHash.generate(pwdHash) || record.password
                    }
                })
                .then((record) => {
                    res.json(record)
                })
                .catch(err => {
                    res.json({
                        err,
                        message: 'Error waktu update User'
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
    User.findByIdAndRemove(req.params.id)
        .exec((err, record) => {
            if (err) {
                res.json({
                    err,
                    message: 'Error waktu deleteById'
                })
            } else {
                res.json(record)
            }
        })
} // deleteById

methods.signup = (req, res, next) => {
    let pwdHash = req.body.password
    User.create({
            username: req.body.username,
            password: passwordHash.generate(pwdHash)
        })
        .then(record => {
            res.json(record)
        })
        .catch(error => {
            res.json({
                error
            })
        })
} // signup

methods.signin = (username, password, next) => {
    User.findOne({
            username: username
        })
        .exec(function(err, record) {
            if (passwordHash.verify(password, record.password)) {
                let data = Object.assign({}, record.toJSON())
                let token = jwt.sign(data, process.env.TOKEN_SECRET, {
                    expiresIn: '1d'
                })
                next(null, {
                    message: 'Login is Successful',
                    token
                })
            } else {
                next({
                    message: 'Your password is not match'
                })
            }
        })
} //signin

//INSERT FB
methods.fbLogin = function(req, res) {
    //PERTAMA LOGIN FB SUKSES, ID LANGSUNG DIBUAT
    User.findOne({
        uuid: req.body.id
    }, function(err, result) {
        if (result == null) {
            var userInput = new User({
                uuid: req.body.id,
                email: req.body.email,
                name: req.body.first_name
            })
            userInput.save(function(err, record) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('pertama login -------');
                    console.log(record);
                    let token = jwt.sign(record, process.env.TOKEN_SECRET, {
                        expiresIn: '1d'
                    })
                    res.send(token)
                }
            })
        } else {
            let token = jwt.sign(result, process.env.TOKEN_SECRET, {
                expiresIn: '1d'
            })
            res.send(token)
        }

    })
}

module.exports = methods