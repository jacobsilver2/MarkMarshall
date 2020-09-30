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

  const handlePlayPause = () => {
    if (!state.currentTrackURL) {
      return
    }
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
      <Element>
        {!playing ? (
          <PlayButtonIcon onClick={handlePlayPause} />
        ) : (
          <PauseButtonIcon onClick={handlePlayPause} />
        )}
      </Element>
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
