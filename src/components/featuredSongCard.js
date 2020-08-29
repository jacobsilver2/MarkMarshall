import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"

const SongWrapper = styled.div`
  border: 1px solid blue;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
    opacity: 80%;
  }
`

const FeaturedSongCard = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)

  function addToGlobalState() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${song.node.audio.file.url}`,
      title: song.node.title,
    })
  }
  return (
    <SongWrapper onClick={addToGlobalState}>
      <h1>{song.node.title}</h1>
    </SongWrapper>
  )
}

export default FeaturedSongCard
