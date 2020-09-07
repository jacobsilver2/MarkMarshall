import React, { useEffect, useState } from "react"
import { createClient } from "contentful-management"
import rankify from "../lib/rankfy"
import RankedCategory from "./dashboardRankedCategory"

const DashboardGetSongs = () => {
  const [songs, setSongs] = useState([])
  //   const [allGenres, setAllGenres] = useState([])

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
      // const allGens =
      return env
    }

    getSongs()
  }, [])

  return (
    <div>
      <RankedCategory category="genre" songs={songs} />
      <RankedCategory category="mood" songs={songs} />
      <RankedCategory category="composer" songs={songs} />
      <RankedCategory category="instrumentation" songs={songs} />
      <RankedCategory category="soundsLike" songs={songs} />
    </div>
  )
}

export default DashboardGetSongs
