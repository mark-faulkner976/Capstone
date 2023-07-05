const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const { expressjwt } = require("express-jwt")
const path = require('path')

// middleware
app.use( express.json() )
app.use( morgan("dev") )
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
    `${process.env.MONGO_URL}`,
    () => console.log("Connected to the DB")
)

// routes
app.use( "/auth", require('./routes/authRouter.js') )
app.use( '/api', expressjwt( { secret: process.env.SECRET, algorithms: ['HS256'] } ) ) // req.user
app.use( "/api", require( "./routes/favRouter.js") )

// error handler
app.use( ( err, req, res, next ) => {
    console.log( err )
    if( err.name === "UnauthorizedError" ) {
        res.status( err.status )
    }
    return res.send( { errMsg: err.message } )
} )

// deployment
app.get( "*", ( req, res ) => {
    res.sendFile( path.join(_dirname, "client", 'build', "index.html"))
})
app.listen( process.env.PORT, () => {
    console.log(`Server is running on local port ${process.env.PORT}`)
} )