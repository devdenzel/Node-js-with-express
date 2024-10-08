// Setting Up Express and Reading the JSON File
const express = require('express')
const morgan = require('morgan')
const app = express()
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const sanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const moviesRouter = require('./Routes/moviesRoutes')
const authRouter = require('./Routes/authRouter')
const userRoute = require('./Routes/userRoute')
const CustomError = require('./Utils/CustomError')
const globalErrorHandler = require('./Controllers/errController')

// custom middleware function that logs a message whenever a request hits your server. It calls next() to pass control to the next middleware in the stack.
//const logger =  function(req, res, next) {
  // console.log('Custom middleware called')
    //next()
//}

// Middleware that parse incoming JSON request
app.use(express.json({limit: '10kb'}))

// using Santize and XSS - Clean
app.use(sanitize())
app.use(xss())

//if(process.env.NODE_ENV === 'development'){
  //  app.use(morgan('dev'))
//}

// The logger middleware function defined earlier is then added, logging "Custom middleware called" on every request.
//app.use(logger)

//To serve static files
app.use(express.static('./Public'))

// Helmet
app.use(helmet())
// Rate limit
let limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request detected from the IP, take a walk and try again later'
})

// Using the limiter
app.use('/user', limiter)
app.use('/auth', limiter)

// This middleware adds a requestedAt property to the request object, containing the timestamp of when the request was made.
//app.use((req, res, next) =>{
  //  req.requestedAt = new Date().toISOString()
    //next()
//})

// api/movies
/* app.get('/movies', getAllMovies)
app.get('/movies/:id', getRouteId)
app.post('/movies', createMovies)
app.patch('/movies/:id', updateMovie)
app.delete('/movies/:id', deleteMovie) */

// using/mounting our imported route module.
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)
app.use('/user', userRoute)

// defining route for non existent URLS
app.all('*', (req, res, next) => {
   // res.status(404).json({
       // status: "fail",
       // message: `Cant find ${req.originalUrl} on the server!`
    //})
    //const err = new Error(`Cant find ${req.originalUrl} on the server!`)
    //err.status = 'fail'
    //err.statusCode = 404
    const err = new CustomError(`Cant find ${req.originalUrl} on the server!`, 404)
    next(err)
})

// using our error handler middleware
app.use(globalErrorHandler)



// import server
module.exports = app