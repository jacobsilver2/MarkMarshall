import React from "react"
import styled from "styled-components"

const PlaylistWrapper = styled.div`
  border: 1px solid blue;
`

const FeaturedPlaylistCard = ({ playlist }) => {
  return (
    <PlaylistWrapper>
      <h1>{playlist.node.title}</h1>
    </PlaylistWrapper>
  )
}

export default FeaturedPlaylistCard
