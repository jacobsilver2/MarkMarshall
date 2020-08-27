import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"

const SongCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  box-shadow: 10px 10px 8px #888888;
  margin: 20px 0;
`

const Song = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)

  function addToGlobalState() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${song.audio.file.url}`,
      title: song.title,
    })
  }

  return (
    <SongCard>
      <h1>{song.title}</h1>
      <h2>{song.bpm} bpm</h2>
      <p>Tags:</p>
      <ul>
        {song.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <button onClick={() => addToGlobalState()}>Click to play</button>
    </SongCard>
  )
}

export default Song
