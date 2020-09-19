import React from "react"
import styled from "styled-components"
import SEO from "../components/seo"
import LatestSongs from "../components/latestSongs"
import LatestPlaylists from "../components/latestPlaylists"
import SearchResults from "../components/searchResults"
import Search from "../components/search"

export const Wrapper = styled.div`
  /* min-height: calc(100vh - 300px); */
  /* overflow: auto; */
  /* overflow: hidden; */
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5rem;
`

const Featured = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <Wrapper>
        <Featured>
          <LatestSongs />
          <LatestPlaylists />
        </Featured>
        <Search />
        <SearchResults />
      </Wrapper>
    </>
  )
}

export default IndexPage
