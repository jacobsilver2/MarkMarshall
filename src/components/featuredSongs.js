import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import FeaturedSongCard from "./featuredSongCard"

const FeatWrapper = styled.div`
  border-right: 1px dashed black;
  border-bottom: 1px dashed black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SongsWrapper = styled.div`
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

const FeaturedSongs = () => {
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
      <FeaturedTitleText>Featured Songs</FeaturedTitleText>
      <SongsWrapper>{songCards}</SongsWrapper>
    </FeatWrapper>
  )
}

export default FeaturedSongs
