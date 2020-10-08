import React, { useContext } from "react"
import { useAuth } from "gatsby-theme-auth0"
import SEO from "../components/seo"
import { GlobalDispatchContext, GlobalStateContext } from "../context/provider"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { StyledFontAwesome } from "../components/Song2"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import BackButton from "../components/backButton"
import deleteEntry from "../lib/deleteContentfulEntry"

const SongWrapper = styled.div`
  height: calc(100vh - 160px);
  width: 100%;
  display: flex;
  flex-direction: column;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`

const StyledImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  /* clip-path: ${({ width }) => `inset(0 0 0 ${width}%`}; */
`

const StyledOverlayImg = styled.img`
  position: absolute;
  top: 0;
  left: 4px;
  width: 100%;
  height: 100%;
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0 )`};
  filter: opacity(0.5) drop-shadow(0 0 0 blue);
`

const Details = styled.div`
  border: 1px dashed black;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`
const DetailsGridItem = styled.div``

const ButtonWrapper = styled.div`
  margin-top: 3rem;
`
const DeleteButton = styled.button`
  all: unset;
  text-decoration: underline;
  margin-left: 2rem;
  cursor: pointer;
`

const SongTemplate = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { isLoggedIn } = useAuth()
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
    waveformImage,
    contentful_id,
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
              <h1>
                {title}{" "}
                {isLoggedIn ? (
                  <>
                    <Link
                      state={{ id: contentful_id, type: "song" }}
                      to="/edit"
                    >
                      edit
                    </Link>
                    <DeleteButton
                      onClick={() => deleteEntry("Song", contentful_id)}
                    >
                      delete
                    </DeleteButton>
                  </>
                ) : null}
              </h1>
            </TitleandPlayWrapper>
            <WaveformWrapper>
              {waveformImage && (
                <StyledImg
                  width={state.currentTrackDuration}
                  src={waveformImage.fluid.src}
                />
              )}
              {state.currentTrackURL === `https:${audio.file.url}` &&
                waveformImage && (
                  <StyledOverlayImg
                    width={state.currentTrackDuration}
                    src={waveformImage.fluid.src}
                  />
                )}
            </WaveformWrapper>
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
        <ButtonWrapper>
          <BackButton />
        </ButtonWrapper>
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
      waveformImage {
        fluid {
          ...GatsbyContentfulFluid
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
