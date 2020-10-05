import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

const BackBtn = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

const BackButton = () => {
  function goBack() {
    navigate(-1)
  }

  return (
    <BackBtn onClick={goBack}>
      <h1>Back</h1>
    </BackBtn>
  )
}

export default BackButton
