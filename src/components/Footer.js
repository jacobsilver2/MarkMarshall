import React, { useContext } from "react"
import styled from "styled-components"
// import MusicPlayer from "./musicPlayer"
import Waves from "../components/wavesFooter"
// import Waves from "./waves"
import { GlobalStateContext } from "../context/provider"

const StyledFooter = styled.footer`
  border: 1px solid black;
`

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <StyledFooter>
      {/* <Waves url={state.currentTrackURL} /> */}
      {/* <MusicPlayer
        url={state.currentTrackURL}
        title={state.currentTrackTitle}
      /> */}
      <Waves />
    </StyledFooter>
  )
}

export default Footer
