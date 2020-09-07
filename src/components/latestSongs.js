import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import FeaturedSongCard from "./featuredSongCard"
import {
  FeatWrapper,
  FeatItemsWrapper,
  FeaturedTitleText,
} from "../styles/FeaturedItems"

const LatestSongs = () => {
  const data = useStaticQuery(graphql`
    query FeaturedSongsQuery {
      featuredSongs: allContentfulSong(
        sort: { fields: audio___createdAt, order: DESC }
        limit: 9
      ) {
        edges {
          node {
            contentful_id
            audio {
              file {
                url
              }
            }
            title
            description {
              description
            }
            composer
            createdAt
            genre
            soundsLike
            tempo
            instrumentation
            mood
          }
        }
      }
    }
  `)
  const { edges: songs } = data.featuredSongs

  const songCards = songs.map(song => (
    <FeaturedSongCard key={song.node.contentful_id} song={song} />
  ))

  return (
    <FeatWrapper>
      <FeaturedTitleText>Latest Songs</FeaturedTitleText>
      <FeatItemsWrapper>{songCards}</FeatItemsWrapper>
    </FeatWrapper>
  )
}

export default LatestSongs
