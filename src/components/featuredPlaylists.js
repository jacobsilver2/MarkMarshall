import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import FeaturedPlaylistCard from "./featuredPlaylistCard"

const FeatWrapper = styled.div`
  border-right: 1px dashed black;
  border-bottom: 1px dashed black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PlaylistsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1rem;
  margin: 1rem;
`

const FeaturedTitleText = styled.h1`
  font-weight: bold;
  text-align: center;
`

const FeaturedPlaylists = () => {
  const data = useStaticQuery(graphql`
    query FeaturedPlaylistQuery {
      featuredPlaylists: allContentfulPlaylist {
        edges {
          node {
            description {
              description
            }
            contentful_id
            title
            updatedAt
          }
        }
      }
    }
  `)

  const { edges: playlists } = data.featuredPlaylists

  const playlistCards = playlists.map(playlist => (
    <FeaturedPlaylistCard
      key={playlist.node.contentful_id}
      playlist={playlist}
    />
  ))

  return (
    <FeatWrapper>
      <FeaturedTitleText>Featured Playlists</FeaturedTitleText>
      <PlaylistsWrapper>{playlistCards}</PlaylistsWrapper>
    </FeatWrapper>
  )
}

export default FeaturedPlaylists
