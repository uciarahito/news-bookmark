'use strict';
const router = require('express').Router()
const userController = require('../controllers/userController')
const jwtHelpers = require('../helpers/check_token')
const passport = require('passport')

// NOTE: USER
router.post('/api/users', userController.insertOne)
router.get('/api/users', userController.getAll)
router.get('/api/user/:id', userController.getById)
router.put('/api/user/:id', userController.updateById)
router.delete('/api/user/:id', userController.deleteById)

router.post('/api/signup', userController.signup)
router.post('/api/signin', passport.authenticate('local', {
    session: false
}), function(req, res) {
    var user = req.user
    res.send(user)
})

module.exports = router