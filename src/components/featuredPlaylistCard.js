import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import { FeatItemWrapper } from "../styles/FeaturedItems"

const StyledLink = styled(Link)`
  text-decoration: none;
`

const FeaturedPlaylistCard = ({ playlist }) => {
  return (
    <>
      <FeatItemWrapper>
        <StyledLink to={`/playlists/${slugify(playlist.node.title)}`}>
          <h1>{playlist.node.title}</h1>
        </StyledLink>
      </FeatItemWrapper>
    </>
  )
}

export default FeaturedPlaylistCard
