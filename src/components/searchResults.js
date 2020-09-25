import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"
import Song from "./song2"

const DescWrapper = styled.div`
  border-top: 1px dashed black;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`
const TitleText = styled.h1`
  text-align: center;
  font-weight: bold;
`

const SearchResults = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.searchResults.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))

  return (
    <DescWrapper>
      <TitleText>Search Results</TitleText>
      {songCards}
    </DescWrapper>
  )
}

export default SearchResults
