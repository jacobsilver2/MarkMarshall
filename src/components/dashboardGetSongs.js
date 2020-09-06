import React, { useEffect, useState } from "react"
import { createClient } from "contentful-management"

const DashboardGetSongs = () => {
  const [songs, setSongs] = useState([])
  //   const [allGenres, setAllGenres] = useState([])

  useEffect(() => {
    async function getSongs() {
      const client = await createClient({
        // This is the access token for this space. Normally you get the token in the Contentful web app
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

  function rankify(entries) {
    let rankedObj = {}
    entries.forEach(entry => {
      if (rankedObj.hasOwnProperty(entry)) {
        rankedObj[entry] += 1
      } else {
        const entryObj = { [entry]: 1 }
        rankedObj = { ...rankedObj, ...entryObj }
      }
    })
    return rankedObj
  }

  //   const allGenres = []
  //   const allGenres = songs.forEach(song => {
  //     song.fields.genre["en-US"].forEach(genre => allGenres.push(genre))
  //   })

  //   const ranked = rankify(allGenres)
  //   console.log(ranked)

  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default DashboardGetSongs
