import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"

const SongWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed black;
  cursor: pointer;
  box-shadow: 5px 5px 4px #888888;
  &:hover {
    background-color: #ffc600;
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
