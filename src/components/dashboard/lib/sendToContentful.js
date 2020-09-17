import { createClient } from "contentful-management"
const uploadToContentful = async values => {
  //waveformarray needs to be an array of strings. Casting here.
  const waveFormStringArray = values.waveFormArray.map(waveform =>
    waveform.toString()
  )

  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  env
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
    .then(asset => {
      env
        .createEntry("song", {
          fields: {
            title: { "en-US": values.title },
            composer: { "en-US": [...values.composerValues] },
            description: { "en-US": values.description },
            instrumentation: { "en-US": [...values.instrumentationValues] },
            tempo: { "en-US": [values.tempo.toString()] },
            waveformarray: { "en-US": [...waveFormStringArray] },
            genre: { "en-US": [...values.genreValues] },
            mood: { "en-US": [...values.moodValues] },
            soundsLike: { "en-US": [...values.soundsLikeValues] },
            audio: {
              "en-US": {
                sys: { id: asset.sys.id, linkType: "Asset", type: "Link" },
              },
            },
          },
        })
        .then(entry => {
          entry.publish()
        })
        .then(entry => {
          alert("song successfully uploaded to contentul")
        })
        .catch(console.error)
    })
}

export default uploadToContentful
