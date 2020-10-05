import React, { useEffect, useState, useContext } from "react"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/provider"
import styled from "styled-components"
import { Timer } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import { PlayerIcon } from "react-player-controls"
import PlayerButton from "./playButton"
import ProgressBar from "./progressBar"
import Loader from "react-loader-spinner"

const CustomPlayer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr minmax(200px, 5fr) 1fr;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
`

const Element = styled.div`
  width: 100%;
  text-align: center;
`
const StyledPlayerButton = styled(PlayerButton)`
  background-color: transparent;
`

const StyledPlayerIcon = styled(PlayerIcon.Play)`
  margin-right: 32px;
  cursor: pointer;
  &:hover {
    transform: scale(1.15);
    /* transition: transform 0.5s linear; */
  }
`

const PlayButtonIcon = props => (
  <StyledPlayerButton {...props}>
    <StyledPlayerIcon width={32} height={32} />
  </StyledPlayerButton>
)

const PauseButtonIcon = props => (
  <PlayerButton {...props}>
    <PlayerIcon.Pause width={32} height={32} style={{ marginRight: 32 }} />
  </PlayerButton>
)

const FooterAudioPlayer = withCustomAudio(props => {
  const [seekTo, setSeekTo] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const {
    streamUrl,
    trackTitle,
    volume,
    currentTime,
    duration,
    playing,
    seeking,
    soundCloudAudio,
  } = props

  useEffect(() => {
    // this is for auto-play.
    if (!state.currentTrackURL) {
      return
    }
    setLoading(true)
    soundCloudAudio.on("canplay", () => {
      setLoading(false)
      soundCloudAudio.play()
    })
  }, [state.currentTrackURL])

  useEffect(() => {
    // this is so the play/pause buttons in the song component will work
    if (state.playing) {
      soundCloudAudio.play()
    }
    if (!state.playing) {
      soundCloudAudio.pause()
    }
  }, [state.playing])

  useEffect(() => {
    // this is so the buttons will change from play to pause in the song component
    playing
      ? dispatch({ type: "PLAYING_ON" })
      : dispatch({ type: "PLAYING_OFF" })
  }, [playing])

  const handlePlayPause = () => {
    // quick check to see if there is no track loaded yet.
    if (!state.currentTrackURL) {
      return
    }
    playing ? soundCloudAudio.pause() : soundCloudAudio.play()
  }

  useEffect(() => {
    // is this a record for most useEffects in one component? Is this a problem?
    dispatch({
      type: "SET_CURRENT_TRACK_DURATION",
      duration: (currentTime / duration) * 100,
    })
  }, [currentTime, duration])

  function playPauseOrLoad() {
    if (playing) {
      return <PauseButtonIcon onClick={handlePlayPause} />
    }
    if (loading) {
      return <Loader type="Audio" color="#000" height={40} width={80} />
    }

    if (!playing) {
      return <PlayButtonIcon onClick={handlePlayPause} />
    }
  }

  return (
    <CustomPlayer>
      <Element>{playPauseOrLoad()}</Element>
      <Element>
        <h2>{trackTitle}</h2>
      </Element>
      <Element>
        <ProgressBar
          seek={setSeekTo}
          isEnabled={seeking ? false : true}
          value={currentTime / duration}
          {...props}
        />
      </Element>
      <Element>
        <Timer {...props} />
      </Element>
    </CustomPlayer>
  )
})

export default FooterAudioPlayer
