import React, { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"
import fakeWaveformArray from "../lib/fakeWaveformArray"
import { GlobalStateContext } from "../context/provider"

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 80px
  position: flex;
  padding: 1rem;
`

const Waveform = ({ url, waveArray }) => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)
  const state = useContext(GlobalStateContext)

  // console.log(url)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: waveformRef.current,
        responsive: true,
      })
    )
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.song = state.currentTrackURL
      waveSurfer.backend.peaks = waveArray ? waveArray : fakeWaveformArray
      waveSurfer.drawBuffer()
      waveSurfer.loaded = false
    }
  }, [waveSurfer])

  const togglePlayPause = () => {
    if (!waveSurfer.loaded) {
      waveSurfer.load(state.currentTrackURL)
      waveSurfer.loaded = true
      waveSurfer.playPause()
    } else {
      waveSurfer.playPause()
    }
    setIsPlaying(prev => !prev)
  }

  return (
    <Wrapper>
      <StyledFontAwesome icon={faPlay} onClick={() => togglePlayPause()} />
      <div ref={waveformRef}></div>
    </Wrapper>
  )
}

export default Waveform
