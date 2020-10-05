import { createClient } from "contentful-management"

const updateContentfulSong = async (values, actions, songId) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const entry = await env.getEntry(songId)
  const origSong = await env.getAsset(entry.fields.audio["en-US"].sys.id)

  const newSong =
    `https:${origSong.fields.file["en-US"].url}` === values.file
      ? null
      : await env
          .createAsset({
            fields: {
              file: {
                "en-US": {
                  contentType: values.fileFormat,
                  fileName: values.title,
                  upload: values.file,
                },
              },
            },
          })
          .then(asset => asset.processForAllLocales())
          .then(processed => processed.publish())
          .catch(console.error)

  const origWaveform = await env.getAsset(
    entry.fields.waveformImage["en-US"].sys.id
  )
  const newWaveform =
    `https:${origWaveform.fields.file["en-US"].url}` === values.waveFormImage
      ? null
      : await env
          .createAsset({
            fields: {
              file: {
                "en-US": {
                  contentType: "image/png",
                  fileName: values.title,
                  upload: values.waveformImage,
                },
              },
            },
          })
          .then(asset => asset.processForAllLocales())
          .then(processed => processed.publish())
          .catch(console.error)

  // const updateAsset = async () => {
  //   if (entry.fields.title) {
  //     entry.fields.title["en-US"] = values.title || ""
  //   }
  //   if (entry.fields.composer) {
  //     entry.fields.composer["en-US"] = [...values.composerValues] || []
  //   }
  //   if (entry.fields.description) {
  //     entry.fields.description["en-US"] = values.description || ""
  //   }
  //   if (entry.fields.instrumentation) {
  //     entry.fields.instrumentation["en-US"] =
  //       [...values.instrumentationValues] || []
  //   }
  //   if (entry.fields.tempo) {
  //     entry.fields.tempo["en-US"] = [values.tempo.toString()] || []
  //   }
  //   if (entry.fields.genre) {
  //     entry.fields.genre["en-US"] = [...values.genreValues] || []
  //   }
  //   if (entry.fields.mood) {
  //     entry.fields.mood["en-US"] = [...values.moodValues] || []
  //   }
  //   if (entry.fields.soundsLike) {
  //     entry.fields.soundsLike["en-US"] = [...values.soundsLikeValues] || []
  //   }
  //   if (newSong) {
  //     entry.fields.audio["en-US"].sys.id = newSong.sys.id
  //   }
  //   if (newWaveform) {
  //     entry.fields.waveformImage["en-US"].sys.id = newWaveform.sys.id
  //   }
  //   return entry.update()
  // }
  // // console.log(newSong)
  // // console.log(newWaveform)
  // const updatedAsset = await updateAsset()
  // console.log(updatedAsset)
}

export default updateContentfulSong
