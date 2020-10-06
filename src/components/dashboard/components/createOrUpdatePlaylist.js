import React, { useContext, useEffect, useState } from "react"
import { GlobalStateContext } from "../../../context/provider"
import { Field, Form, Formik } from "formik"
import Loader from "react-loader-spinner"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import CardContent from "@material-ui/core/CardContent"
import { Category, Label, Title } from "../styles/DashboardCreateNewSong"
import { createClient } from "contentful-management"
import { initialPlaylistValues } from "../lib/initialValues"
import { playlistValidationSchema } from "../lib/validationSchema"
import ImageUpload from "./imageUpload"
import SingleTextField from "./singleTextEntry"
import ArrayEntry from "./playlistArrayEntry"
import {
  createNewContentfulPlaylist,
  updateContentfulPlaylist,
} from "../lib/createOrUpdateContentfulPlaylist"

// this needs to be changed for responsive
const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
  },
}))
const CreateOrUpdatePlaylist = ({ songs, playlistId }) => {
  const [editPlaylistInitialValues, setEditPlaylistInitialValues] = useState({})
  const [editPlaylistIsLoading, seteditPlaylistIsLoading] = useState(false)
  const [allContentfulSongs, setAllContentfulSongs] = useState([])
  const state = useContext(GlobalStateContext)
  const classes = useStyles()

  // we will use this only when editing an existing playlist
  // TODO: update this, it's copied from updateSong
  useEffect(() => {
    async function getPlaylist() {
      seteditPlaylistIsLoading(true)
      if (playlistId) {
        const client = await createClient({
          accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
        })
        const space = await client.getSpace(
          process.env.GATSBY_CONTENTFUL_SPACE_ID
        )
        const env = await space.getEnvironment("master")
        const entry = await env.getEntry(playlistId, { include: 2 })
        // console.log(entry)

        // checking for null values
        const desc = entry.fields.description
          ? entry.fields.description["en-US"].content[0].content[0].value
          : ""
        const title = entry.fields.title && entry.fields.title["en-US"]
        const imgAsset =
          entry.fields.image && entry.fields.image["en-US"].sys.id
            ? await env.getAsset(entry.fields.image["en-US"].sys.id)
            : null
        const imgUrl = imgAsset
          ? `https:${imgAsset.fields.file["en-US"].url}`
          : ``
        const songIds = entry.fields.songs["en-US"].map(song => song.sys.id)
        const promises = songIds.map(async id => {
          const song = await env.getEntry(id)
          return song
        })
        const selectedSongs = await Promise.all(promises)
        // console.log(selectedSongs)

        // we have to do this because were not receiving any songs as props when editing
        const allCntflSongs = await env.getEntries()
        const allSongs = allCntflSongs.items.filter(
          entry => entry.sys.contentType.sys.id === "song"
        )
        setAllContentfulSongs([...allSongs])
        // console.log(allContentfulSongs)
        setEditPlaylistInitialValues({
          ...initialPlaylistValues,
          title: title,
          image: imgUrl,
          songs: [...selectedSongs],
          description: desc,
        })
      }
      seteditPlaylistIsLoading(false)
    }

    getPlaylist()
  }, [playlistId])

  return (
    <Card
      style={{ textAlign: "center", margin: "5rem auto" }}
      className={classes.root}
    >
      <CardHeader
        title={playlistId ? "Edit A Playlist" : "Create A New Playlist"}
      />
      {!editPlaylistIsLoading ? (
        <>
          <Formik
            initialValues={
              editPlaylistInitialValues
                ? editPlaylistInitialValues
                : initialPlaylistValues
            }
            validationSchema={playlistValidationSchema}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              // console.log("soon to be a submit function")
              // console.log(values)
              playlistId
                ? updateContentfulPlaylist(values, actions, playlistId)
                : createNewContentfulPlaylist(values, actions)
              seteditPlaylistIsLoading(false)
            }}
          >
            {({
              isSubmitting,
              errors,
              touched,
              values,
              resetForm,
              setFieldValue,
              handleChange,
              handleBlur,
            }) => {
              return (
                <Form>
                  <Category>
                    <Title>
                      <Label htmlFor="image">Image</Label>
                    </Title>
                    <Field
                      name="image"
                      component={ImageUpload}
                      title="Select An Image"
                      errorMessage={
                        errors["image"] ? errors["image"] : undefined
                      }
                      touched={touched["image"]}
                      onBlur={handleBlur}
                    />
                  </Category>
                  <SingleTextField
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Enter the title"
                  />
                  <SingleTextField
                    label="Description"
                    name="description"
                    type="textarea"
                    placeholder="Enter a description"
                  />
                  <ArrayEntry
                    fieldArrayName="songs"
                    songs={songs ? songs : allContentfulSongs}
                    errors={errors["songs"] ? errors["songs"] : undefined}
                  />
                  <Button type="submit" fullWidth color="primary">
                    {isSubmitting ? (
                      <>
                        <Loader
                          type="Audio"
                          color="#000"
                          height={80}
                          width={80}
                        />
                      </>
                    ) : playlistId ? (
                      "update"
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </>
      ) : (
        <Loader type="Audio" color="#000" height={80} width={80} />
      )}
    </Card>
  )
}

export default CreateOrUpdatePlaylist
