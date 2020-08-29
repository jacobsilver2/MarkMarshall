import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import PlaylistTile from "../components/playlistTile"

const AllPlaylistsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
`

export const plQuery = graphql`
  query AllPlaylistsQuery {
    allPlaylists: allContentfulPlaylist {
      edges {
        node {
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
        }
      }
    }
  }
`

const Playlists = ({ data }) => {
  const { edges: allPlaylists } = data.allPlaylists

  const playlistTiles = allPlaylists.map(playlist => (
    <PlaylistTile key={playlist.node.contentful_id} playlist={playlist} />
  ))

  return <AllPlaylistsWrapper>{playlistTiles}</AllPlaylistsWrapper>
}

export default Playlists