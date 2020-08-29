import React from "react"
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css"

const MusicPlayer = ({ url, title }) => {
  const audioList = [
    {
      musicSrc: url,
      name: title,
    },
  ]

  return (
    <>
      <ReactJkMusicPlayer
        // theme="auto"
        mode="full"
        preload={true}
        remember={true}
        toggleMode={false}
        audioLists={audioList}
        showDownload={false}
        showThemeSwitch={false}
        drag={false}
        spaceBar={true}
        responsive={false}
      />
    </>
  )
}

export default MusicPlayer
