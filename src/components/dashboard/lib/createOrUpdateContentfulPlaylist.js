import { createClient } from "contentful-management"

export const createNewContentfulPlaylist = async (values, actions) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")

  const songsObj = values.songs.map(song => {
    return { sys: { type: "Link", linkType: "Entry", id: song.sys.id } }
  })
  // console.log(songsObj)

  const playlistImgAsset = await env
    .createAsset({
      fields: {
        file: {
          "en-US": {
            contentType: "image",
            fileName: values.title,
            upload: values.image,
          },
        },
      },
    })
    .then(asset => asset.processForAllLocales())
    .then(asset => asset.publish())
    .catch(console.error)

  const playlistObj = await env
    .createEntry("playlist", {
      fields: {
        title: { "en-US": values.title },
        description: {
          "en-US": {
            content: [
              {
                nodeType: "paragraph",
                data: {},
                content: [
                  {
                    value: values.description,
                    nodeType: "text",
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
            data: {},
            nodeType: "document",
          },
        },
        songs: {
          "en-US": songsObj,
        },
        image: {
          "en-US": {
            sys: {
              id: playlistImgAsset.sys.id,
              linkType: "Asset",
              type: "Link",
            },
          },
        },
      },
    })
    .then(entry => entry.publish())
    .then(entry => {
      actions.setSubmitting(false)
      actions.resetForm()
      alert("Playlist successfully created")
    })
    .catch(console.error)
}

export const updateContentfulPlaylist = async (values, actions, playlistId) => {
  const client = await createClient({
    accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
  })
  const space = await client.getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  const env = await space.getEnvironment("master")
  const entry = await env.getEntry(playlistId)
  const origImg = await env.getAsset(entry.fields.image["en-US"].sys.id)
  // console.log(origImg)
  // console.log(values.image)
  // todo: do we need to get all the song assets? maybe not
  const songsObj = values.songs.map(song => {
    return { sys: { type: "Link", linkType: "Entry", id: song.sys.id } }
  })

  const makeNewImage = async () => {
    if (`https:${origImg.fields.file["en-US"].url}` === values.image) {
      return null
    }
    const asset = await env
      .createAsset({
        fields: {
          file: {
            "en-US": {
              contentType: "image",
              fileName: values.title,
              upload: values.image,
            },
          },
        },
      })
      .then(asset => asset.processForAllLocales())
      .then(asset => asset.publish())
    return asset
  }

  const updateAsset = async () => {
    if (entry.fields.title) {
      entry.fields.title["en-US"] = values.title || ""
    }
    if (entry.fields.description) {
      entry.fields.description["en-US"].content[0].content[0].value =
        values.description
    }
    if (entry.fields.songs) {
      entry.fields.songs["en-US"] = songsObj
    }
    if (img) {
      entry.fields.image["en-US"].sys.id = img.sys.id
    }
    return await entry.update().then(entry => entry.publish())
  }

  const img = await makeNewImage()
  const updatedAsset = await updateAsset()
  actions.setSubmitting(false)
  actions.resetForm()
  console.log(updatedAsset)
  alert("Playlist has been updated")
}
