import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const SongWrapper = styled.div`
  height: calc(100vh - 160px);
`

const SongTemplate = props => {
  const {
    audio,
    composer,
    genre,
    instrumentation,
    mood,
    soundsLike,
    tempo,
    description,
    contentful_id,
    title,
    updatedAt,
  } = props.data.song
  return <SongWrapper>{<h1>{title}</h1>}</SongWrapper>
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
