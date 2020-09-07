import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import FeaturedPlaylistCard from "./featuredPlaylistCard"
import {
  FeatWrapper,
  FeatItemsWrapper,
  FeaturedTitleText,
} from "../styles/FeaturedItems"

const LatestPlaylists = () => {
  const data = useStaticQuery(graphql`
    query FeaturedPlaylistQuery {
      featuredPlaylists: allContentfulPlaylist(
        sort: { fields: createdAt, order: DESC }
        limit: 9
      ) {
        edges {
          node {
            description {
              description
            }
            contentful_id
            title
            createdAt
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
      <FeaturedTitleText>Latest Playlists</FeaturedTitleText>
      <FeatItemsWrapper>{playlistCards}</FeatItemsWrapper>
    </FeatWrapper>
  )
}

export default LatestPlaylists
