import React, { useContext } from "react"
import SEO from "../components/seo"
import { GlobalDispatchContext } from "../context/provider"
import { graphql } from "gatsby"
import styled from "styled-components"
import { StyledFontAwesome } from "../components/Song2"
import { faPlay } from "@fortawesome/free-solid-svg-icons"

const SongWrapper = styled.div`
  height: calc(100vh - 160px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SongCard = styled.div`
  width: 80%;
  height: 80%;
  border: 1px dashed black;
  display: grid;
  grid-template-rows: 1fr 3fr;
`
const TitleAndWaveform = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px dashed black;
  padding: 1rem;
`
const TitleandPlayWrapper = styled.div`
  display: flex;
  align-items: center;
  h1 {
    padding-left: 3rem;
    font-weight: bold;
  }
`

const WaveformWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Details = styled.div`
  border: 1px dashed black;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`
const DetailsGridItem = styled.div`
  /* border: 1px dashed grey; */
`

const SongTemplate = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const {
    audio,
    composer,
    genre,
    instrumentation,
    mood,
    soundsLike,
    tempo,
    description,
    title,
  } = props.data.song

  function addToGlobalState() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${audio.file.url}`,
      title: title,
    })
  }

  return (
    <>
      <SEO title={title} />
      <SongWrapper>
        <SongCard>
          <TitleAndWaveform>
            <TitleandPlayWrapper>
              <StyledFontAwesome
                onClick={() => addToGlobalState()}
                icon={faPlay}
              />
              <h1>{title}</h1>
            </TitleandPlayWrapper>
            <WaveformWrapper>WAVEFORM</WaveformWrapper>
          </TitleAndWaveform>
          <Details>
            <DetailsGridItem>
              Description: {description ? description.description : ""}
            </DetailsGridItem>
            <DetailsGridItem>
              Composer: {composer ? composer.join(", ") : ""}
            </DetailsGridItem>
            <DetailsGridItem>
              Instrumentation:{" "}
              {instrumentation ? instrumentation.join(", ") : ""}
            </DetailsGridItem>
            <DetailsGridItem>
              Genre: {genre ? genre.join(", ") : ""}
            </DetailsGridItem>
            <DetailsGridItem>
              Mood: {mood ? mood.join(", ") : ""}
            </DetailsGridItem>
            <DetailsGridItem>Tempo: {tempo ? tempo : ""}</DetailsGridItem>
            <DetailsGridItem>
              Sounds Like: {soundsLike ? soundsLike.join(", ") : ""}
            </DetailsGridItem>
          </Details>
        </SongCard>
      </SongWrapper>
    </>
  )
}

export default SongTemplate

export const songQuery = graphql`
  query($contentful_id: String!) {
    song: contentfulSong(contentful_id: { eq: $contentful_id }) {
      audio {
        file {
          url
        }
      }
      composer
      contentful_id
      createdAt
      description {
        description
      }
      genre
      instrumentation
      mood
      soundsLike
      tempo
      title
    }
  }
`
