import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalDispatchContext } from "../context/provider"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import { listLength } from "../lib/constants"
import tempoCalc from "../lib/tempoCalc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  min-height: 10rem;
  border: 1px solid black;
  margin-bottom: 2rem;
`

const Info = styled.div`
  padding: 0 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;

  a {
    font-weight: bold;
  }
`

const Waveform = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`

const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Song2 = ({ song, loading }) => {
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
    return truncated || notTruncated
  }

  const truncateParagraph = paragraph => {
    const arr = paragraph.split(".")
    if (arr.length > 1) {
      return arr.slice(0, 1) + "..."
    }

    return paragraph
  }

  return (
    <Wrapper>
      <Info>
        <div>
          <Link to={`/music/${slugify(title)}`}>{title}</Link>
        </div>
        <div>{renderList(genre)}</div>
        <div>
          {description && truncateParagraph(description.internal.content)}
        </div>
        <div>{renderList(composer)}</div>
        <div>{tempoCalc(tempo)}</div>
        <div>{renderList(instrumentation)}</div>
      </Info>
      <Waveform>
        <StyledFontAwesome onClick={() => addToGlobalState()} icon={faPlay} />
      </Waveform>
    </Wrapper>
  )
}

export default Song2