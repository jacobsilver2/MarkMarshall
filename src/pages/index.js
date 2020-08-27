import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"
import SEO from "../components/seo"
import Song from "../components/song"
import FeaturedSongs from "../components/featuredSongs"
import FeaturedPlaylists from "../components/featuredPlaylists"
import SearchResults from "../components/searchResults"
import Search from "../components/search"

const Wrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5rem;
`

const Featured = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const IndexPage = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.filteredSongs.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))

  return (
    <Wrapper>
      <SEO title="Home" />
      <Featured>
        <FeaturedSongs />
        <FeaturedPlaylists />
      </Featured>
      <Search />
      <SearchResults />
    </Wrapper>
  )
}

export default IndexPage
