import React, { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"
import fakeWaveformArray from "../lib/fakeWaveformArray"
import { GlobalStateContext } from "../context/provider"
import loadable from "@loadable/component"

// const WaveSurfer = loadable(() => import("wavesurfer.js"))

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const WaveWrapper = styled.div`
  display: flex;
  /* position: flex; */
  padding: 1rem;
  align-items: center;
`

const Wave = styled.div`
  width: 100%;
  margin: 0 1rem;
`

const Waveform = ({ url, waveArray }) => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)
  const state = useContext(GlobalStateContext)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: waveformRef.current,
        responsive: true,
        removeMediaElementOnDestroy: false,
      })
    )
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.loaded = false
      waveSurfer.load(state.currentTrackURL)
      // waveSurfer.on("ready", function () {
      //   waveSurfer.play()
      // })
    }
  }, [waveSurfer, state.currentTrackURL])

  const togglePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.playPause()
      setIsPlaying(prev => !prev)
    }
  }

  return (
    <WaveWrapper>
      <StyledFontAwesome
        icon={isPlaying ? faPause : faPlay}
        onClick={() => togglePlayPause()}
      />
      <Wave ref={waveformRef}></Wave>
    </WaveWrapper>
  )
}

export default Waveform
