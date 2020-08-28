import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"
import Song from "./song"

const DescWrapper = styled.div`
  border-top: 1px solid black;
  overflow: scroll;
`

const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.filteredSongs.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))

  return (
    <DescWrapper>
      <h1>Search Results</h1>
      {songCards}
    </DescWrapper>
  )
}

export default SearchResults
