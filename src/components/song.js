import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"
import { Link } from "gatsby"
import slugify from "../lib/slugify"

const SongCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  box-shadow: 5px 5px 4px #888888;
  margin: 20px;
  padding: 1rem;
`

const Song = ({ song }) => {
  //trying out getting songs from global state. Gonna try the normal graphql query for the
  // playlists section.

  const dispatch = useContext(GlobalDispatchContext)
  const {
    title,
    genre,
    mood,
    composer,
    instrumentation,
    description,
    tempo,
    soundsLike,
  } = song

  function addToGlobalState() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${song.audio.file.url}`,
      title: song.title,
    })
  }

  return (
    <SongCard>
      {title && (
        <h1>
          <Link to={`/music/${slugify(title)}`}>{title}</Link>
        </h1>
      )}

      {composer && (
        <h2>
          {composer.length > 1 ? "Composers" : "Composer"} :{" "}
          {composer.join(", ")}
        </h2>
      )}
      {description && <h2>Description: {description.internal.content}</h2>}
      {genre && (
        <h2>
          {genre.length > 1 ? "Genres" : "Genre"} : {genre.join(", ")}
        </h2>
      )}
      {mood && (
        <h2>
          {mood.length > 1 ? "Moods" : "Mood"} : {mood.join(", ")}
        </h2>
      )}
      {instrumentation && (
        <h2>Instrumentation : {instrumentation.join(", ")}</h2>
      )}

      {tempo && <h2>Tempo : {tempo.join(", ")}</h2>}
      {soundsLike && <h2>Sounds Like : {soundsLike.join(", ")}</h2>}

      <button onClick={() => addToGlobalState()}>Click to play</button>
    </SongCard>
  )
}

export default Song
