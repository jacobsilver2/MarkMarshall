import React, { useContext } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import { GlobalDispatchContext } from "../context/provider"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { StyledFontAwesome } from "../components/Song2"

const OuterWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
  border: 1px dashed black;
`
const PlaylistImg = styled(Img)`
  max-height: 50%;
  max-width: 50%;
`

const SongWrapper = styled.div`
  display: flex;
`

const SongLink = styled(Link)`
  padding: 0 2rem;
`

const PlaylistTemplate = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const {
    description,
    contentful_id,
    title,
    updatedAt,
    image,
    songs,
  } = props.data.playlist

  function addToGlobalState(song) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${song.audio.file.url}`,
      title: song.title,
    })
  }

  return (
    <OuterWrapper>
      <PlaylistWrapper>
        <PlaylistImg fluid={image.fluid} />
        <h1>{title}</h1>
        <ol>
          {songs.map((song, i) => (
            <SongWrapper>
              <SongLink to={`/music/${slugify(song.title)}`}>
                <li>
                  {i + 1}. {song.title}
                </li>
              </SongLink>
              <StyledFontAwesome
                onClick={() => addToGlobalState(song)}
                icon={faPlay}
              />
            </SongWrapper>
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
