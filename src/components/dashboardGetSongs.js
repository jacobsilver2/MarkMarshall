import React, { useEffect, useState } from "react"
import { createClient } from "contentful-management"
import styled from "styled-components"
import DashboardCreateNewSong from "../components/dashboardCreateNewSongFileSecondTry"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const DashboardGetSongs = () => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    async function getSongs() {
      const client = await createClient({
        accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
      })
      const space = await client.getSpace(
        process.env.GATSBY_CONTENTFUL_SPACE_ID
      )
      const env = await space.getEnvironment("master")
      const entries = await env.getEntries()
      const allSongs = entries.items.filter(
        entry => entry.sys.contentType.sys.id === "song"
      )
      setSongs([...allSongs])
      return env
    }

    getSongs()
  }, [])

  return <Wrapper>{<DashboardCreateNewSong songs={songs} />}</Wrapper>
}

export default DashboardGetSongs
