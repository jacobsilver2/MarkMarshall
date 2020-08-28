import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import FeaturedPlaylistCard from "./featuredPlaylistCard"

const FeatWrapper = styled.div`
  border-bottom: 1px solid black;
`
const PlaylistsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
