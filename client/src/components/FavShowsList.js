import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import FavCard from "./FavCard";

export default function FavShowsList() {
    const { favShows } = useContext( UserContext )

    return (
        <div className="search-list">
            {favShows.map(( favShow ) => (
                <FavCard key={ favShow.imdbId } favShow={ favShow } />
            ))}
        </div>
    )
}

// map over all favShows array to display
// can try re-using the CSS classes
// new component other than search card
// button make a post req