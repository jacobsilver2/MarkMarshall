import React, { useEffect, useState, useContext } from "react"
import { GlobalDispatchContext } from "../../context/provider"
import styled from "styled-components"
import { Timer } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import { PlayerIcon } from "react-player-controls"
import PlayerButton from "./playButton"
import ProgressBar from "./progressBar"

const CustomPlayer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`
const PlayButtonIcon = props => (
  <PlayerButton {...props}>
    <PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }} />
  </PlayerButton>
)

const PauseButtonIcon = props => (
  <PlayerButton {...props}>
    <PlayerIcon.Pause width={32} height={32} style={{ marginRight: 32 }} />
  </PlayerButton>
)

const FooterAudioPlayer = withCustomAudio(props => {
  const [seekTo, setSeekTo] = useState(null)
  const dispatch = useContext(GlobalDispatchContext)
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

  const handlePlayPause = () => {
    playing ? soundCloudAudio.pause() : soundCloudAudio.play()
  }

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_TRACK_DURATION",
      duration: (currentTime / duration) * 100,
    })
  }, [currentTime, duration])

  return (
    <CustomPlayer>
      {!playing ? (
        <PlayButtonIcon onClick={handlePlayPause} />
      ) : (
        <PauseButtonIcon onClick={handlePlayPause} />
      )}
      <h2>{trackTitle}</h2>
      <ProgressBar
        seek={setSeekTo}
        isEnabled={seeking ? false : true}
        value={currentTime / duration}
        {...props}
      />
      <Timer {...props} />
    </CustomPlayer>
  )
})

export default FooterAudioPlayer
