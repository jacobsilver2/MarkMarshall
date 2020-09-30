import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext } from "../../context/provider"
import AudioPlayer from "./footerAudioPlayer"

const StyledFooter = styled.footer`
  grid-area: footer;
  border-top: 1px solid black;
  z-index: 3;
  min-height: 80px;
  display: flex;
  align-items: center;
`

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <StyledFooter>
      <AudioPlayer
        streamUrl={state.currentTrackURL}
        trackTitle={state.currentTrackTitle}
        preloadType="auto"
      />
    </StyledFooter>
  )
}

export default Footer
