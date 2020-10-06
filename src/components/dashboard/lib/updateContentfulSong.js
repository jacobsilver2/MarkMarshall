import { createClient } from "contentful-management"

const updateContentfulSong = async (values, actions, songId) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const entry = await env.getEntry(songId)

  const origSong = await env.getAsset(entry.fields.audio["en-US"].sys.id)
  const origWaveform = await env.getAsset(
    entry.fields.waveformImage["en-US"].sys.id
  )

  const makeNewSong = async () => {
    if (`https:${origSong.fields.file["en-US"].url}` === values.file) {
      return null
    }
    const asset = await env
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
      .then(asset => asset.publish())

    return asset
  }

  const makeNewWaveform = async () => {
    if (
      `https:${origWaveform.fields.file["en-US"].url}` === values.waveFormImage
    ) {
      return null
    }
    const asset = await env
      .createAsset({
        fields: {
          file: {
            "en-US": {
              contentType: "img",
              fileName: values.title,
              upload: values.waveFormImage,
            },
          },
        },
      })
      .then(ass => ass.processForAllLocales())
      .then(poop => poop.publish())
    return asset
  }

  const updateAsset = async () => {
    if (entry.fields.title) {
      entry.fields.title["en-US"] = values.title || ""
    }
    if (entry.fields.composer) {
      entry.fields.composer["en-US"] = [...values.composerValues] || []
    }
    if (entry.fields.description) {
      entry.fields.description["en-US"] = values.description || ""
    }
    if (entry.fields.instrumentation) {
      entry.fields.instrumentation["en-US"] =
        [...values.instrumentationValues] || []
    }
    if (entry.fields.tempo) {
      entry.fields.tempo["en-US"] = [values.tempo.toString()] || []
    }
    if (entry.fields.genre) {
      entry.fields.genre["en-US"] = [...values.genreValues] || []
    }
    if (entry.fields.mood) {
      entry.fields.mood["en-US"] = [...values.moodValues] || []
    }
    if (entry.fields.soundsLike) {
      entry.fields.soundsLike["en-US"] = [...values.soundsLikeValues] || []
    }
    if (wave) {
      entry.fields.audio["en-US"].sys.id = wave.sys.id
    }
    if (wf) {
      entry.fields.waveformImage["en-US"].sys.id = wf.sys.id
    }
    return await entry.update().then(entry => entry.publish())
  }
  const wave = await makeNewSong()
  const wf = await makeNewWaveform()
  const updatedAsset = await updateAsset()
  actions.setSubmitting(false)
  actions.resetForm()
  console.log(updatedAsset)
}

export default updateContentfulSong
