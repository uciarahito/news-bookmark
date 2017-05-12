const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const controller = require('./controllers/userController')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')

var index = require('./routes/index');

app.use(cors())

mongoose.connect('mongodb://localhost/whowon');

// NOTE: set
app.set('port', process.env.PORT || 3000)

// NOTE: use
/* jika gagal melalui instal cors, maka tambah code di bawah ini */
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
//     next()
// })

app.use(require('morgan')('dev'))
app.use(require('body-parser').urlencoded({
    extended: false
}));
app.use(require('body-parser').json());

passport.use(new Strategy(controller.signin));

app.use(passport.initialize());

app.use('/', index);

// NOTE: run
app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
})