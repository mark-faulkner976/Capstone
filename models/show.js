const mongoose = require( 'mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema ( {
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String
    },
    genres: {
        type: Array
    },
    streamingInfo: {
        type: Array
    },
    backdropURLs: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    year: {
        type: Number
    },
    imdbRating: {
        type: Number
    }
} )

module.exports = mongoose.model( "Show", showSchema )