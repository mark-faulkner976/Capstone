import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import SearchCard from "./SearchCard";

export default function SearchList() {
    const { searchResults } = useContext( UserContext )

    return (
        <div className="search-list">
            {searchResults.map(( movie ) => (
                <SearchCard key={ movie.imdbId } result={ movie } />
            ))}
        </div>
    )
}