import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"
import SEO from "../components/seo"
import Song from "../components/song"
import LatestSongs from "../components/latestSongs"
import LatestPlaylists from "../components/latestPlaylists"
import SearchResults from "../components/searchResults"
import Search from "../components/search"

export const Wrapper = styled.div`
  height: calc(100vh - 160px);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5rem;
`

const Featured = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const IndexPage = () => {
  // const state = useContext(GlobalStateContext)
  // const songCards = state.filteredSongs.map(song => (
  //   <Song key={song.node.contentful_id} song={song.node} />
  // ))

  return (
    <Wrapper>
      <SEO title="Home" />
      <Featured>
        <LatestSongs />
        <LatestPlaylists />
      </Featured>
      <Search />
      <SearchResults />
    </Wrapper>
  )
}

export default IndexPage
