import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const Wrapper = styled.div`
  position: flex;
`

const Waveform = ({ url }) => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: waveformRef.current,
      })
    )
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.load(url)
    }
  }, [waveSurfer])

  const togglePlayPause = () => {
    waveSurfer.playPause()
    setIsPlaying(!isPlaying)
  }

  return (
    <Wrapper>
      <StyledFontAwesome icon={faPlay} onClick={() => togglePlayPause()} />
      <div ref={waveformRef}></div>
    </Wrapper>
  )
}

export default Waveform
