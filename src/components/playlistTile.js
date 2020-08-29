import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import BackgroundImage from "gatsby-background-image"

const TileWrapper = styled.div`
  min-width: 300px;
  min-height: 300px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`

const StyledbckgImg = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
`

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`

const PlaylistTile = ({ playlist }) => {
  const { node: pl } = playlist

  return (
    <TileWrapper>
      <StyledLink to={`/playlists/${slugify(pl.title)}`}>
        <StyledbckgImg backgroundColor={`#040e18`} fluid={pl.image.fluid}>
          <Title>{pl.title}</Title>
        </StyledbckgImg>
      </StyledLink>
    </TileWrapper>
  )
}

export default PlaylistTile
