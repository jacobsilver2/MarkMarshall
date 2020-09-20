import React, { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"
import fakeWaveformArray from "../lib/fakeWaveformArray"
import { GlobalDispatchContext } from "../context/provider"

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  align-items: center;
`

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const Wave = styled.div`
  width: 100%;
  margin: 0 1rem;
`

const Waveform = ({ url, title, waveArray }) => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)
  const dispatch = useContext(GlobalDispatchContext)
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
      waveSurfer.song = url
      waveSurfer.backend.peaks = waveArray ? waveArray : fakeWaveformArray
      waveSurfer.drawBuffer()
      waveSurfer.loaded = false
    }
  }, [waveSurfer])

  const togglePlayPause = () => {
    if (!waveSurfer.loaded) {
      waveSurfer.load(url)
      waveSurfer.loaded = true
      waveSurfer.playPause()
    } else {
      waveSurfer.playPause()
    }
    setIsPlaying(prev => !prev)
  }

  return (
    <Wrapper>
      <StyledFontAwesome
        icon={faPlay}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_TRACK", url: url, title: title })
          // togglePlayPause()
        }}
      />
      <Wave ref={waveformRef}></Wave>
    </Wrapper>
  )
}

export default Waveform
