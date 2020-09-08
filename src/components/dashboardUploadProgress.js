import React from "react"
import styled from "styled-components"

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgb(183, 155, 229);
  border-radius: 5px;
`

const Progress = styled.div`
  background-color: rgba(103, 58, 183, 1);
  height: 100%;
  margin: 0;
  border-radius: 5px;
  width: ${({ prog }) => `${prog}%`};
`

const Progress = ({ prog }) => {
  return (
    <ProgressBar>
      <Progress></Progress>
    </ProgressBar>
  )
}

export default Progress
