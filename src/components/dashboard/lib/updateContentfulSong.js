import { createClient } from "contentful-management"

const updateContentfulSong = async (values, actions, songId) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const entryObj = await env
    .getEntry(songId)
    .then(entry => {
      entry.fields.title["en-US"] = values.title || ""
      entry.fields.composer["en-US"] = [...values.composerValues] || []
      entry.fields.description["en-US"] = values.description || ""
      entry.fields.instrumentation["en-US"] =
        [...values.instrumentationValues] || []
      entry.fields.tempo["en-US"] = [values.tempo.toString()] || []
      entry.fields.genre["en-US"] = [...values.genreValues] || []
      entry.fields.mood["en-US"] = [...values.moodValues] || []
      entry.fields.soundsLike["en-US"] = [...values.soundsLikeValues] || []
      return entry.update()
    })
    .then(entry => entry.publish())
    .then(entry => {
      actions.setSubmitting(false)
      actions.resetForm()
      alert(`Entry ${entry.sys.id} updated.`)
    })
}

export default updateContentfulSong
