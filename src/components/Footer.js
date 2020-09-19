import React, { useContext } from "react"
import styled from "styled-components"
import Waves from "../components/wavesFooter"
import { GlobalStateContext } from "../context/provider"

const StyledFooter = styled.footer`
  grid-area: footer;
  /* height: 60px; */
  /* height: 200px; */
  z-index: 3;
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-gap: 10px;
  /* flex-direction: column; */
`

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <StyledFooter>
      <div>
        <h5>{state.currentTrackTitle}</h5>
      </div>
      <Waves />
    </StyledFooter>
  )
}

export default Footer
