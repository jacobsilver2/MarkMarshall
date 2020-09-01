import React, { useContext, useEffect, useState } from "react"
import { GlobalStateContext } from "../context/provider"
import { graphql } from "gatsby"
import styled from "styled-components"
import ReactPaginate from "react-paginate"
import Song from "../components/song"
import Sidebar from "../components/musicSidebar"

const Wrapper = styled.div`
  display: grid;
  height: calc(100vh - 160px);
  grid-template-columns: 1fr 6fr;
`

const Cards = styled.div`
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
  const [perPage, setPerPage] = useState(3)
  const [elements, setElements] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const filtered =
      state.filters.length > 0
        ? allSongs.filter(song => {
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
    setfilteredSongs(filtered)
    setPageCount(Math.ceil(filteredSongs.length / perPage))
    setElements(filtered.slice(offset, offset + perPage))
  }, [state.filters])

  const handlePageClick = data => {
    const selectedPage = data.selected
    const offset = selectedPage * perPage
    setCurrentPage(selectedPage)
    setOffset(offset)
  }

  return (
    <Wrapper>
      <Sidebar>SIDEBAR</Sidebar>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        forcePage={currentPage}
      >
        <Cards>
          {elements.map(song => (
            <Song key={song.node.contentful_id} song={song.node} />
          ))}
        </Cards>
      </ReactPaginate>
    </Wrapper>
  )
}

export default Music
