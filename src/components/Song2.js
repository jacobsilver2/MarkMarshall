import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { GlobalDispatchContext, GlobalStateContext } from "../context/provider"
import slugify from "../lib/slugify"
import { listLength } from "../lib/constants"
import tempoCalc from "../lib/tempoCalc"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  min-height: 10rem;
  border: 1px solid black;
  margin-bottom: 2rem;
`

const Info = styled.div`
  padding: 1rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-size: 2rem;
  a {
    font-weight: bold;
  }
`

const WaveWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Wave = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`
const ImgWrapper = styled.div`
  position: relative;
`

const StyledImg = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const StyledOverlayImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0 )`};
  filter: opacity(0.5) drop-shadow(0 0 0 blue);
`

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  position: relative;
  max-width: 20px;
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Song = ({ song, loading }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const {
    title,
    genre,
    composer,
    instrumentation,
    description,
    tempo,
    waveformImage,
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
    const isLarge = category && category.length > listLength
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
  // console.log(waveformImage)
  return (
    <Wrapper>
      <Info>
        <div>
          <Link to={`/music/${slugify(title)}`}>{title}</Link>
        </div>
        <div>{genre ? renderList(genre) : ""}</div>
        <div>
          {description ? truncateParagraph(description.internal.content) : ""}
        </div>
        <div>{composer ? renderList(composer) : ""}</div>
        <div>{tempo ? tempoCalc(tempo) : ""}</div>
        <div>{instrumentation ? renderList(instrumentation) : ""}</div>
      </Info>
      <WaveWrapper>
        <StyledFontAwesome onClick={() => addToGlobalState()} icon={faPlay} />
        <Wave style={{ width: "100%", padding: "1rem 1rem" }}>
          {waveformImage && (
            <ImgWrapper>
              <StyledImg src={waveformImage.fluid.src} />
              {state.currentTrackURL === `https:${song.audio.file.url}` && (
                <StyledOverlayImg
                  width={state.currentTrackDuration}
                  src={waveformImage.fluid.src}
                />
              )}
            </ImgWrapper>
          )}
        </Wave>
      </WaveWrapper>
    </Wrapper>
  )
}

export default Song
