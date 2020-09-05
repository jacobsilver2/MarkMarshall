import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const OuterWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlaylistWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px dashed black;
`
const PlaylistImg = styled(Img)`
  max-height: 50%;
  max-width: 50%;
`

const PlaylistTemplate = props => {
  const {
    description,
    contentful_id,
    title,
    updatedAt,
    image,
    songs,
  } = props.data.playlist
  return (
    <OuterWrapper>
      <PlaylistWrapper>
        <PlaylistImg fluid={image.fluid} />
        <h1>{title}</h1>
        <ol>
          {songs.map(song => (
            <li>{song.title}</li>
          ))}
        </ol>
      </PlaylistWrapper>
    </OuterWrapper>
  )
}

export default PlaylistTemplate

export const pageQuery = graphql`
  query($contentful_id: String!) {
    playlist: contentfulPlaylist(contentful_id: { eq: $contentful_id }) {
      description {
        description
      }
      contentful_id
      title
      updatedAt
      image {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      songs {
        composer
        contentful_id
        genre
        instrumentation
        mood
        soundsLike
        tempo
        title
        audio {
          file {
            url
          }
        }
      }
    }
  }
`
