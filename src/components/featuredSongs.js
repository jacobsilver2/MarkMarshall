import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"

const FeatWrapper = styled.div`
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`

const FeaturedSongs = () => {
  const state = useContext(GlobalStateContext)
  return (
    <FeatWrapper>
      <h1>Featured Songs</h1>
    </FeatWrapper>
  )
}

export default FeaturedSongs
