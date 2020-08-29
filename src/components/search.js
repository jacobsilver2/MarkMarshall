import React, { useState, useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext, GlobalDispatchContext } from "../context/provider"

const SearchBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-self: center;
  align-self: center;
`
const Input = styled.input`
  margin: auto;
  font-size: 4.5rem;
  height: 80%;
  width: 80%;
  border-radius: 15px;
  outline: none;
`

const Search = () => {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const emptyQuery = ""
  const [localState, setLocalState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value
    const songs = state.songs || []

    let filteredData = songs.filter(song => {
      const { title, tempo, instrumentation, composer, genre } = song.node
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tempo && tempo.join("").toLowerCase().includes(query.toLowerCase())) ||
        (instrumentation &&
          instrumentation
            .join("")
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (composer &&
          composer.join("").toLowerCase().includes(query.toLowerCase())) ||
        (genre && genre.join("").toLowerCase().includes(query.toLowerCase()))
      )
    })
    if (query === "") {
      filteredData = []
    }
    setLocalState({
      query,
      filteredData,
    })

    dispatch({ type: "ADD_FILTERED_SONGS", filteredSongs: filteredData })
  }
  return (
    <>
      <SearchBox>
        <Input
          type="text"
          aria-label="Search"
          placeholder="Search by Title, Tempo, Genre, Sounds-Like, Instrumentation or Composer"
          onChange={handleInputChange}
        />
      </SearchBox>
    </>
  )
}

export default Search