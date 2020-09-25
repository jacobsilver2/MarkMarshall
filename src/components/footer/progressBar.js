import React, { useState } from "react"
import { Slider, Direction } from "react-player-controls"
import styled from "styled-components"
import useDimensions from "react-use-dimensions"

const Wrapper = styled.div`
  width: 100%;
`

const StyledProgressBar = styled(Slider)`
  width: 60%;
  height: 8px;
  border-radius: 4px;
  background: whitesmoke;
  transition: width 0.1s;
  cursor: ${({ isSliderEnabled }) => (isSliderEnabled ? "pointer" : "default")};
`
const StyledSliderBar = styled.div`
  position: absolute;
  background: grey;
  border-radius: 4;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ width }) => `${width}%`};
`
const StyledSliderHandle = styled.div`
  position: absolute;
  top: 0;
  left: ${({ val }) => (val ? `${val}%` : 0)};
  margin-top: -4px;
  margin-bottom: -8px;
  width: 16px;
  height: 16px;
  background: black;
  border-radius: 100%;
  transform: scale(1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.3);
  }
`

const SliderHandle = ({ value }) => {
  const val = value * 100
  return <StyledSliderHandle val={val} />
}

const SliderBar = ({ value }) => {
  const width = value * 100

  return <StyledSliderBar width={width || 0}></StyledSliderBar>
}

const ProgressBar = ({ isEnabled, value, seek, ...props }) => {
  const [ref, { x }] = useDimensions()

  const handleSeekTrack = e => {
    props.soundCloudAudio.seek({
      offsetX: x * e,
      target: { offsetWidth: x },
    })
  }

  return (
    <Wrapper ref={ref}>
      <StyledProgressBar
        onChange={e => handleSeekTrack(e)}
        isSliderEnabled={isEnabled}
        direction={Direction.HORIZONTAL}
        {...props}
      >
        <SliderBar value={value} />
        <SliderHandle value={value} />
      </StyledProgressBar>
    </Wrapper>
  )
}

export default ProgressBar
