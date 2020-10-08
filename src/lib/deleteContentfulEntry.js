import { createClient } from "contentful-management"
import { navigate } from "gatsby"

async function deleteEntry(type, contentful_id) {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const entry = await env.getEntry(contentful_id)
  const unpublished = await entry.unpublish()
  const deleted = unpublished
    .delete()
    .then(() => alert(`${type} has been deleted`))
  navigate("/")
}

export default deleteEntry
