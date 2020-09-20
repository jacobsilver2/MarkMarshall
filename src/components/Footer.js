import React, { useContext } from "react"
import styled from "styled-components"
// import Waves from "../components/wavesFooter"
import { GlobalStateContext } from "../context/provider"
import loadable from "@loadable/component"

const Waves = loadable(() => import("../components/wavesFooter"))

const StyledFooter = styled.footer`
  position: relative;
  grid-area: footer;
  /* height: 60px; */
  /* height: 200px; */
  z-index: 3;
  display: inline;
  align-items: center;
  /* grid-template-rows: 1fr 3fr; */
  /* grid-gap: 10px; */
  /* flex-direction: column; */
`
const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
`

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <StyledFooter>
      <TextWrapper>
        <h5>{state.currentTrackTitle}</h5>
      </TextWrapper>
      <Waves />
    </StyledFooter>
  )
}

export default Footer
