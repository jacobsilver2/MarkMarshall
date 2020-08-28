import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

const TileWrapper = styled.div`
  min-width: 300px;
  min-height: 300px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <StyledbckgImg backgroundColor={`#040e18`} fluid={pl.image.fluid}>
        <Title>{pl.title}</Title>
      </StyledbckgImg>
    </TileWrapper>
  )
}

export default PlaylistTile
