import React, { useContext } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "gatsby-theme-auth0"

import deleteEntry from "../lib/deleteContentfulEntry"
import slugify from "../lib/slugify"
import { GlobalDispatchContext } from "../context/provider"
import { StyledFontAwesome } from "../components/Song2"

const OuterWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`
const Card = styled.div`
  min-height: 500px;
  border: 1px solid black;
  margin: 0 1rem;
`

const PlaylistImg = styled(Img)`
  max-height: 250px;
`

const SongWrapper = styled.div`
  display: flex;
  padding: 1rem;
`

const SongLink = styled(Link)`
  padding: 0 2rem;
`

const Title = styled.h1`
  text-align: center;
  padding: 1rem 0;
`

const Desc = styled.p`
  color: grey;
  padding: 1rem;
  font-size: 1.3rem;
`

const DeleteButton = styled.button`
  all: unset;
  text-decoration: underline;
  margin-left: 2rem;
  cursor: pointer;
`

const PlaylistTemplate = props => {
  const dispatch = useContext(GlobalDispatchContext)
  const { isLoggedIn } = useAuth()
  const {
    description,
    title,
    image,
    songs,
    contentful_id,
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
      <Card>
        <PlaylistImg fluid={image.fluid} />
        <Title>
          {title}{" "}
          {isLoggedIn ? (
            <>
              <Link state={{ id: contentful_id, type: "playlist" }} to="/edit">
                edit
              </Link>
              <DeleteButton
                onClick={() => deleteEntry("Playlist", contentful_id)}
              >
                delete
              </DeleteButton>
            </>
          ) : null}
        </Title>
        <Desc>{description && description.content[0].content[0].value}</Desc>
        <ol>
          {songs.map((song, i) => (
            <SongWrapper key={song.contentful_id}>
              <StyledFontAwesome
                onClick={() => addToGlobalState(song)}
                icon={faPlay}
              />
              <SongLink to={`/music/${slugify(song.title)}`}>
                <li>
                  {i + 1}. {song.title}
                </li>
              </SongLink>
            </SongWrapper>
          ))}
        </ol>
      </Card>
    </OuterWrapper>
  )
}

export default PlaylistTemplate

export const pageQuery = graphql`
  query($contentful_id: String!) {
    playlist: contentfulPlaylist(contentful_id: { eq: $contentful_id }) {
      description {
        content {
          content {
            value
          }
        }
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
