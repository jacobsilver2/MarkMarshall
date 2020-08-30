import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import slugify from "../lib/slugify"

const PlaylistWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
  cursor: pointer;
  box-shadow: 5px 5px 4px #888888;
  &:hover {
    background-color: #ffc600;
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
