import React, { useState, useRef, useEffect, useContext } from "react"
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import WaveSurfer from "wavesurfer.js"
import { GlobalStateContext, GlobalDispatchContext } from "../context/provider"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const StyledFontAwesome = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: grey;
  cursor: pointer;
  &:hover {
    color: black;
  }
`
const WaveWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  align-items: center;
`

const Wave = styled.div`
  width: 100%;
  margin: 0 1rem;
`

const Waveform = () => {
  const waveformRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container:
          state.currentTrackRef && state.currentTrackRef.current
            ? state.currentTrackRef.current
            : waveformRef.current,
        responsive: true,
        removeMediaElementOnDestroy: false,
      })
    )
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      setIsLoading(true)
      waveSurfer.load(state.currentTrackURL)
      // console.log(state.currentTrackRef)
      waveSurfer.on("ready", function () {
        // waveSurfer.play()
        setIsLoading(false)
      })
    }
  }, [waveSurfer, state.currentTrackURL])

  const togglePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.playPause()
      setIsPlaying(prev => !prev)
      dispatch({ type: "TOGGLE_PLAYING" })
    }
  }

  return (
    <WaveWrapper>
      {isLoading ? (
        <Loader type="Bars" color="#999999" height={80} width={80} />
      ) : (
        <StyledFontAwesome
          icon={isPlaying ? faPause : faPlay}
          onClick={() => togglePlayPause()}
        />
      )}
      <Wave
        ref={
          state.currentTrackRef && state.currentTrackURL.current
            ? state.currentTrackRef.current
            : waveformRef
        }
      ></Wave>
    </WaveWrapper>
  )
}

export default Waveform
