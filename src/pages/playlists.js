import React from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"
import PlaylistTile from "../components/playlistTile"
import { motion } from "framer-motion"

const AllPlaylistsWrapper = styled(motion.div)`
  height: calc(100vh - 160px);
  overflow: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;
  padding: 1rem;
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

  return (
    <>
      <SEO title="Playlists" />
      <AllPlaylistsWrapper>{playlistTiles}</AllPlaylistsWrapper>
    </>
  )
}

export default Playlists
