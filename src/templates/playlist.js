import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const PlaylistWrapper = styled.div`
  height: calc(100vh - 160px);
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
    <PlaylistWrapper>
      <h1>{title}</h1>
      <PlaylistImg fluid={image.fluid} />
      <ol>
        {songs.map(song => (
          <li>{song.title}</li>
        ))}
      </ol>
    </PlaylistWrapper>
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
