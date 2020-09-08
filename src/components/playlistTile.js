import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"
import slugify from "../lib/slugify"
import BackgroundImage from "gatsby-background-image"

const TileWrapper = styled.div`
  min-width: 300px;
  min-height: 300px;
  overflow: hidden;
  border: 1px solid black;
  img {
    transition: transform 0.5s ease;
  }
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  &:hover {
    /* background-color: rgba(0, 0, 0, 0.9); */
    img {
      transform: scale(1.1);
    }
  }
`
const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`

const StyledImg = styled(Img)`
  transition: transform 0.5s ease;
`

const StyledbckgImg = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
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
        {/* <Title>{pl.title}</Title> */}
        <StyledImg fluid={pl.image.fluid} />
        {/* <StyledbckgImg backgroundColor={`#040e18`} fluid={pl.image.fluid}> */}
        {/* </StyledbckgImg> */}
      </StyledLink>
    </TileWrapper>
  )
}

export default PlaylistTile
