const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
//const session = require('express-session')
//const passport = require('passport')
//const SequelizeStore = require('connect-session-sequelize')(session.Store)
//const db = require('./db')
//const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 1337
const app = express()
const socketio = require('socket.io')
module.exports = app

// passport registration
// passport.serializeUser((user, done) => done(null, user.id))
// passport.deserializeUser((id, done) =>
//   db.models.user.findById(id)
//     .then(user => done(null, user))
//     .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  // app.use(session({
  //   secret: process.env.SESSION_SECRET || 'my best friend is Cody',
  //   store: sessionStore,
  //   resave: false,
  //   saveUninitialized: false
  // }))
  // app.use(passport.initialize())
  // app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

//const syncDb = () => db.sync()

createApp();
startListening();
