import React, { useState, useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext, GlobalDispatchContext } from "../context/provider"

const SearchBox = styled.div``
const Input = styled.input`
  width: 100%;
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

    const filteredData = songs.filter(song => {
      const { tags, title } = song.node
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join("").toLowerCase().includes(query.toLowerCase()))
      )
    })
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
          placeholder="Type to filter songs..."
          onChange={handleInputChange}
        />
      </SearchBox>
    </>
  )
}

export default Search
