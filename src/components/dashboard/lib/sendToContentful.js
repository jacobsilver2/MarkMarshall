import { createClient } from "contentful-management"
const uploadToContentful = async (values, actions) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const songAss = await env
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
    .catch(console.error)

  const songWaveAss = await env
    .createAsset({
      fields: {
        file: {
          "en-US": {
            contentType: "img",
            fileName: `${values.title}_waveform`,
            upload: values.waveFormImage,
          },
        },
      },
    })
    .then(asset => asset.processForAllLocales())
    .then(asset => asset.publish())
    .catch(console.error)

  const songOb = await env
    .createEntry("song", {
      fields: {
        title: { "en-US": values.title },
        composer: { "en-US": [...values.composerValues] },
        description: { "en-US": values.description },
        instrumentation: { "en-US": [...values.instrumentationValues] },
        tempo: { "en-US": [values.tempo.toString()] },
        genre: { "en-US": [...values.genreValues] },
        mood: { "en-US": [...values.moodValues] },
        soundsLike: { "en-US": [...values.soundsLikeValues] },
        audio: {
          "en-US": {
            sys: { id: songAss.sys.id, linkType: "Asset", type: "Link" },
          },
        },
        waveformImage: {
          "en-US": {
            sys: { id: songWaveAss.sys.id, linkType: "Asset", type: "Link" },
          },
        },
      },
    })
    .then(entry => {
      entry.publish()
    })
    .then(entry => {
      actions.setSubmitting(false)
      actions.resetForm()
      alert("song successfully uploaded to contentul")
    })
    .catch(console.error)
}

export default uploadToContentful
