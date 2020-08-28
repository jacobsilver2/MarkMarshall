import React, { useContext } from "react"
import { GlobalStateContext } from "../context/provider"
import styled from "styled-components"
import Song from "../components/song"

const Wrapper = styled.div`
  display: grid;
  min-height: calc(100vh - 160px);
  grid-template-columns: 1fr 6fr;
  /* dispslay: block; */
  overflow: scroll;
`

const Sidebar = styled.div`
  height: 100%;
  border-right: 2px solid black;
`

const Cards = styled.div``

const Music = () => {
  const state = useContext(GlobalStateContext)
  const songCards = state.songs.map(song => (
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
