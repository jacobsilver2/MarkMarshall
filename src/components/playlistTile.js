import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Img from "gatsby-image"
import { Link } from "gatsby"
import slugify from "../lib/slugify"

const TileWrapper = styled(motion.div)`
  position: relative;
  min-width: 300px;
  min-height: 300px;
  overflow: hidden;
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
const TitleWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Title = styled.h1`
  font-size: 4rem;
  color: white;
  font-weight: bold;
  text-align: center;
`

const PlaylistTile = ({ playlist }) => {
  const { node: pl } = playlist

  return (
    <TileWrapper
      whileHover={{
        scale: 1.05,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
      }}
    >
      <StyledLink to={`/playlists/${slugify(pl.title)}`}>
        <StyledImg fluid={pl.image.fluid} />
        <TitleWrapper>
          <Title>{pl.title}</Title>
        </TitleWrapper>
      </StyledLink>
    </TileWrapper>
  )
}

export default PlaylistTile
