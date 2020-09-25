import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  appearance: none;
  outline: none;
  border: none;
  border-radius: 3;
  background: white;
  color: blue;
  &:hover {
    color: lightblue;
  }
`

const PlayButton = ({ style, children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default StyledButton
