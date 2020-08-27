import React, { useContext } from "react"
import { GlobalStateContext } from "../context/provider"
import Song from "./song"

const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.filteredSongs.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))

  return (
    <div>
      <h1>Search Results</h1>
      {songCards}
    </div>
  )
}

export default SearchResults
