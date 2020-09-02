import React, { useContext, useEffect, useState } from "react"
import { GlobalStateContext } from "../context/provider"
import { graphql } from "gatsby"
import styled from "styled-components"
import Song from "../components/song"
import Sidebar from "../components/proSidebar"
import Pagination from "../components/pagination"
import { songsPerPage } from "../lib/constants"

const Wrapper = styled.div`
  display: grid;
  height: calc(100vh - 160px);
  grid-template-columns: 1fr 6fr;
`

const Cards = styled.div`
  flex-grow: 1;
`
const SongsAndPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`
export const musicData = graphql`
  query allSongsData {
    allSongs: allContentfulSong(sort: { fields: title }) {
      edges {
        node {
          contentful_id
          tempo
          soundsLike
          instrumentation
          audio {
            file {
              url
            }
          }
          title
          description {
            internal {
              content
            }
          }
          composer
          createdAt
          genre
          mood
        }
      }
    }
  }
`

const Music = ({ data }) => {
  const { edges: allSongs } = data.allSongs
  const state = useContext(GlobalStateContext)
  const [filteredSongs, setfilteredSongs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const filtered =
      state.filters.length > 0
        ? allSongs.filter(song => {
            setLoading(true)
            return state.filters.some(f => {
              return (
                (song.node.genre && song.node.genre.includes(f)) ||
                (song.node.composer && song.node.composer.includes(f)) ||
                (song.node.tempo && song.node.tempo.includes(f)) ||
                (song.node.soundsLike && song.node.soundsLike.includes(f)) ||
                (song.node.instrumentation &&
                  song.node.instrumentation.includes(f)) ||
                (song.node.mood && song.node.mood.includes(f))
              )
            })
          })
        : allSongs
    setCurrentPage(1)
    setfilteredSongs(filtered)
    setLoading(false)
  }, [state.filters])

  const indexOfLastSong = currentPage * songsPerPage
  const indexOfFirstSong = indexOfLastSong - songsPerPage
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong)

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }

  console.log(currentSongs)

  return (
    <Wrapper>
      <Sidebar>SIDEBAR</Sidebar>
      <SongsAndPaginationWrapper>
        <Pagination
          songsPerPage={songsPerPage}
          totalSongs={filteredSongs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Cards>
          {currentSongs.map(song => (
            <Song
              loading={loading}
              key={song.node.contentful_id}
              song={song.node}
            />
          ))}
        </Cards>
        <Pagination
          songsPerPage={songsPerPage}
          totalSongs={filteredSongs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </SongsAndPaginationWrapper>
    </Wrapper>
  )
}

export default Music
