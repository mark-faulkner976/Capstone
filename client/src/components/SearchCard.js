import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import FavShowsList from "./FavShowsList";

export default function SearchCard( { result } ) {
    const { title, genres, output_language, overview, backdropURLs, streamingInfo, imdbRating, year } = result

    const streamingPlatform = streamingInfo?.us
    const streamingKeys = streamingPlatform ? Object.keys( streamingPlatform ) : []

    const { token, addShow, favShows } = useContext( UserContext )

    const buttonToggle = () => {
        return favShows.some( movie => movie.overview === overview )
    }
    // console.log(result)
    const showButton = token && !buttonToggle()
    // console.log(buttonToggle())

    function addToFavs() {
        addShow({
            title: title,
            genres: genres,
            overview: overview,
            streamingInfo: streamingKeys,
            backdropURLs: backdropURLs['1280'] ? backdropURLs['1280'] : backdropURLs['300']
        })
    }

    return (
        <div className="search-card">
            <div className="image-wrapper" >
                { backdropURLs['1280'] ? <img src={ backdropURLs['1280'] } /> : <img src={ backdropURLs['300'] } />}
                { showButton && <button className="favButton" onClick={ addToFavs } >Favorite</button> }
            </div>
            <div className="title-year">
                <h3>{ title } </h3>
                { year && <p>({ year })</p> }
            </div>
            { imdbRating && <p>IMDB Rating: {imdbRating}/100</p>}
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
                { streamingPlatform ? 
                    <div className="streaming-list">
                        { streamingKeys.map( ( key, index ) => (
                            <span key={ key }>
                                { key }{index !== streamingKeys.length - 1 && ','}
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