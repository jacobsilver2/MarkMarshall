import React, { useEffect, useState } from "react"
import { createClient } from "contentful-management"
import styled from "styled-components"
import DashboardCreateNewSong from "../components/dashboardCreateNewSong"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

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

  const uploadSong = async () => {
    // const client = await createClient({
    //   accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
    // })
    // const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
    // const env = await space.getEnvironment("master")
    // env
    //   .createAsset({
    //     fields: {
    //       file: {
    //         "en-US": {
    //           // contentType: newSong.songFile[0].type,
    //           contentType: "image/jpeg",
    //           // fileName: newSong.songFile[0].name,
    //           fileName: "18_19IMP_SPT_4door_Side_red_garage_SCI_HiRes.jpg",
    //           // upload: newSong.songFile[0], //! look at this
    //           upload:
    //             "https://www.subaru.ca/Content/7907/media/General/ImageLibrary/18_19IMP_SPT_4door_Side_red_garage_SCI_HiRes.jpg",
    //         },
    //       },
    //     },
    //   })
    //   .then(asset => asset.processForAllLocales())
    //   .then(asset => asset.publish())
    //   .then(asset => {
    //     env.createEntry("song", {
    //       fields: {
    //         title: { "en-US": newSong.values.title },
    //         composer: { "en-US": newSong.values.composer },
    //         instrumentation: { "en-US": newSong.values.instrumentation },
    //         tempo: { "en-US": newSong.values.tempo.toString() },
    //         genre: { "en-US": newSong.values.genre },
    //         mood: { "en-US": newSong.values.mood },
    //         soundsLike: { "en-US": newSong.values.soundsLike },
    //         audio: {
    //           "en-US": {
    //             sys: { id: asset.sys.id, linkType: "Asset", type: "Link" },
    //           },
    //         },
    //       },
    //     })
    //   })
    //   .then(entry => {
    //     console.log(entry)
    //   })
    //   .catch(console.error)
    // console.log("we are in the upload song function")
  }

  // console.log(newSong)
  return (
    <Wrapper>
      <DashboardCreateNewSong songs={songs} />
    </Wrapper>
  )
}

export default DashboardGetSongs
