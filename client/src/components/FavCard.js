import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function FavCard( { favShow } ) {
    const {title, genres, output_language, overview, backdropURLs, streamingInfo, _id, year, imdbRating } = favShow

    // don't need, from search card when streamingplatform was object names
    // const streamingPlatform = streamingInfo?.us
    // const streamingKeys = streamingPlatform ? Object.keys( streamingPlatform ) : []

    const { token, removeFav } = useContext( UserContext )


    return (
        <div className="search-card">
            <div className="image-wrapper" >
            <img src={ backdropURLs } />
                { token && <button className="favButton" onClick={ () => removeFav( _id ) } >Remove</button> }
            </div>
            <div className="title-year">
                <h3>{ title } </h3>
                { year && <p>({ year })</p> }
            </div>
            <p>IMDB Rating:{imdbRating}/100</p>
            <p><b>Description:</b> { overview }</p>
            <div className="genre-section">
                <p>Genres:</p>
                <div className="genre-list" >
                    { genres.map( genreItem => (
                        <span key={ genreItem.id } >{ genreItem.name }</span>
                    ) ) }
                </div>
            </div>
            <div className="streaming-section">
                <h4>Streaming on: </h4>
                { streamingInfo ? 
                    <div className="streaming-list">
                        { streamingInfo.map( ( key, index ) => (
                            <span key={ key }>
                                { key }{index !== streamingInfo.length - 1 && ','}
                            </span>
                        ) ) }
                    </div>
                    :
                        <p>Streaming not available</p>
                }
            </div>
        </div>
    )
}