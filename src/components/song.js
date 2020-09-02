import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import { listLength } from "../lib/constants"

const SongCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  box-shadow: 5px 5px 4px #888888;
  margin: 20px;
  padding: 1rem;
`
const H1 = styled.h1`
  font-weight: bold;
`

const InlineH2 = styled.h2`
  display: inline;
`

const Song = ({ song, loading }) => {
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

  if (loading) {
    return <h2>Loading</h2>
  }

  const renderList = category => {
    const isLarge = category.length > listLength
    const remainingCats = isLarge && category.length - listLength
    const truncated =
      isLarge &&
      category.slice(0, listLength).join(", ") +
        ` ...and ${remainingCats} more.`
    const notTruncated = !isLarge && category.join(", ")
    return <InlineH2>{truncated || notTruncated}</InlineH2>
  }

  return (
    <SongCard>
      {title && (
        <H1>
          <Link to={`/music/${slugify(title)}`}>{title}</Link>
        </H1>
      )}

      {composer && (
        <InlineH2>
          {composer.length > 1 ? "Composers" : "Composer"} :{" "}
          {renderList(composer)}
        </InlineH2>
      )}
      {description && <h2>Description: {description.internal.content}</h2>}
      {genre && (
        <InlineH2>
          {genre.length > 1 ? "Genres" : "Genre"} : {renderList(genre)}
        </InlineH2>
      )}
      {mood && (
        <InlineH2>
          {mood.length > 1 ? "Moods" : "Mood"} : {renderList(mood)}
        </InlineH2>
      )}
      {instrumentation && (
        <InlineH2>Instrumentation : {renderList(instrumentation)}</InlineH2>
      )}

      {tempo && <h2>Tempo : {renderList(tempo)}</h2>}
      {soundsLike && <h2>Sounds Like : {renderList(soundsLike)}</h2>}

      <button onClick={() => addToGlobalState()}>Click to play</button>
    </SongCard>
  )
}

export default Song
