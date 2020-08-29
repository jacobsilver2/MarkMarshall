import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import slugify from "../lib/slugify"

const PlaylistWrapper = styled.div`
  border: 1px solid blue;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
    opacity: 80%;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

const FeaturedPlaylistCard = ({ playlist }) => {
  return (
    <>
      <StyledLink to={`/playlists/${slugify(playlist.node.title)}`}>
        <PlaylistWrapper>
          <h1>{playlist.node.title}</h1>
        </PlaylistWrapper>
      </StyledLink>
    </>
  )
}

export default FeaturedPlaylistCard
