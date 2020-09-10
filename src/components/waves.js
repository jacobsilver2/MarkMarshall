import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"
import fakeWaveformArray from "../lib/fakeWaveformArray"

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
  position: flex;
  padding: 1rem;
`

const Waveform = ({ url, waveArray }) => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)

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
      // waveSurfer.load(url)
      waveSurfer.song = url

      waveSurfer.backend.peaks = waveArray ? waveArray : fakeWaveformArray
      waveSurfer.drawBuffer()
      waveSurfer.loaded = false
      // waveSurfer.on("ready", function () {
      //   if (!waveSurfer.loaded) {
      //     waveSurfer.loaded = true
      //     waveSurfer.play()
      //   }
      // })
      // waveSurfer.on("play", function () {
      //   console.log("were here")
      //   if (!waveSurfer.loaded) {
      //     waveSurfer.load(waveSurfer.song, waveSurfer.backend.peaks)
      //   }
      // })
    }
  }, [waveSurfer])

  const togglePlayPause = () => {
    if (!waveSurfer.loaded) {
      waveSurfer.load(url)
      // waveSurfer.loadMediaElement(
      //   waveSurfer.song,
      //   waveSurfer.backend.peaks,
      //   true,
      //   waveSurfer.getDuration()
      // )
      waveSurfer.playPause()
      waveSurfer.loaded = true
    }
    if (waveSurfer.loaded) {
      waveSurfer.playPause()
    }
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
