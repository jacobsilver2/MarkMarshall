import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"
import SEO from "../components/seo"
import Song from "../components/song"

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5rem;
  border: 1px solid green;
`

const Featured = styled.div`
  /* border: 1px solid red; */
`

const Search = styled.div`
  /* border: 1px solid red; */
`

const Results = styled.div`
  /* border: 1px solid red; */
`

const IndexPage = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.filteredSongs.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))

  return (
    <Wrapper>
      <SEO title="Home" />
      <Featured></Featured>
      <Search></Search>
      <Results></Results>
    </Wrapper>
  )
}

export default IndexPage
