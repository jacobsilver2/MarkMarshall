import React, { useContext } from "react"
import { GlobalDispatchContext } from "../context/provider"
import { FeatItemWrapper } from "../styles/FeaturedItems"

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
    // not including a link to the song because we want clicking
    // to just play the track
    <>
      <FeatItemWrapper onClick={addToGlobalState}>
        <h1>{song.node.title}</h1>
      </FeatItemWrapper>
    </>
  )
}

export default FeaturedSongCard
