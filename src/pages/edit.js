import React from "react"
import styled from "styled-components"
import UpdateSong from "../components/dashboard/components/createOrUpdateSong"
import UpdatePlaylist from "../components/dashboard/components/createOrUpdatePlaylist"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Edit = ({ location }) => {
  let updateComp
  if (location.state.type === "song") {
    updateComp = <UpdateSong songId={location.state.id} />
  }
  if (location.state.type === "playlist") {
    updateComp = <UpdatePlaylist playlistId={location.state.id} />
  }
  return <Wrapper>{updateComp}</Wrapper>
}

export default Edit
