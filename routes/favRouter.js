const express = require( 'express' )
const favRouter = express.Router()
const Show = require( '../models/show' )


// try catch model from context
//     const searchStreaming = async () => {
//         try {
//             const response = await axios.get( 'https://streaming-availability.p.rapidapi.com/v2/search/basic', {
//                 params: searchParams,
//                 headers: {
//                     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//                     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//                   },
//             } )
//             setSearchResults( response.data ) 
//         } catch ( error ) {
//             console.error( 'Error occurred while searching: ', error )
//         }
//     }


// add new fav
favRouter.post( '/new', ( req, res, next) => {
    req.body.userId = req.auth._id
    const newFav = new Show( req.body )

    try {
        newFav.save(( err, show ) => {
            if( err ) {
                res.send( err )
            } else {
                res.send( show )
                // console.log( 'fav saved: ', show )
            }
        } )
    } catch {
        res.status( 500 )
        res.send({ error : "favRouter request Error!" })
    }

} )

// get all user favs
favRouter.get( "/:userId", ( req, res, next ) => {
    Show.find({ userId: req.auth._id }, ( err, shows ) => {
        if ( err ) {
            res.status( 500 )
            return next( err )
        }
        return res.status( 200 ).send( shows )
    })
} )

// delete user fav
favRouter.delete( '/:user/:favId', ( req, res, next ) => {
    Show.findOneAndDelete( { user: req.auth._id, _id: req.params.favId }, ( err, favs ) => {
        if ( err ) {
            res.status( 500 )
            return next( err )
        }
        return res.status( 200 ).send( "favorite deleted" )
    } )
})

module.exports = favRouter