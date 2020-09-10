import React, { useContext } from "react"
import { GlobalDispatchContext } from "../context/provider"
import { FeatItemWrapper } from "../styles/FeaturedItems"
import { StyledFontAwesome } from "../components/Song2"
import styled from "styled-components"
import { Link } from "gatsby"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import slugify from "../lib/slugify"

const StyledLink = styled(Link)`
  text-decoration: none;
  padding-left: 1rem;
`

const Wrapper = styled(FeatItemWrapper)`
  justify-content: flex-start;
  padding-left: 1rem;
`

const FeaturedSongCard = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)

  function addToGlobalState() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: `https:${song.node.audio.file.url}`,
      title: song.node.title,
    })
  }
  return (
    <>
      <Wrapper whileHover={{ scale: 1.05 }}>
        <StyledFontAwesome onClick={addToGlobalState} icon={faPlay} />
        <StyledLink to={`/music/${slugify(song.node.title)}`}>
          <h1>{song.node.title}</h1>
        </StyledLink>
      </Wrapper>
    </>
  )
}

export default FeaturedSongCard
