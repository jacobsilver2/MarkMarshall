import React, { useContext } from "react"
import { GlobalStateContext } from "../context/provider"
import styled from "styled-components"
import Song from "../components/song"
import Sidebar from "../components/musicSidebar"

const Wrapper = styled.div`
  display: grid;
  height: calc(100vh - 160px);
  grid-template-columns: 1fr 6fr;
`

const Cards = styled.div`
  overflow: scroll;
`

const Music = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.filteredSongs.map(song => (
    <Song key={song.node.contentful_id} song={song.node} />
  ))
  return (
    <Wrapper>
      <Sidebar>SIDEBAR</Sidebar>
      <Cards>{songCards}</Cards>
    </Wrapper>
  )
}

export default Music
