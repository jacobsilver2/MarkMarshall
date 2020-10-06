import React, { useContext, useEffect, useState } from "react"
import { GlobalStateContext } from "../../../context/provider"
import { Field, Form, Formik } from "formik"
import Loader from "react-loader-spinner"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { Category, Label, Title } from "../styles/DashboardCreateNewSong"
import { createClient } from "contentful-management"
import { initialSongValues } from "../lib/initialValues"
import validationSchema from "../lib/validationSchema"
import FileUpload from "./fileUpload"
import SingleTextField from "./singleTextEntry"
import ArrayEntry from "./arrayEntry"
import sendToContentful from "../lib/sendToContentful"
import updateContentfulSong from "../lib/updateContentfulSong"

// this needs to be changed for responsive
const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
  },
}))

const CreateOrUpdateSong = ({ songs, songId }) => {
  const [editSongInitialValues, setEditSongInitialValues] = useState({})
  const [editSongIsLoading, seteditSongIsLoading] = useState(false)
  const state = useContext(GlobalStateContext)
  const classes = useStyles()

  // we will use this only when editing an existing song
  useEffect(() => {
    async function getSong() {
      seteditSongIsLoading(true)
      if (songId) {
        const client = await createClient({
          accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
        })
        const space = await client.getSpace(
          process.env.GATSBY_CONTENTFUL_SPACE_ID
        )
        const env = await space.getEnvironment("master")
        const entry = await env.getEntry(songId)

        // checking for null values
        const tempos = entry.fields.tempo ? entry.fields.tempo["en-US"] : []
        const composers = entry.fields.composer
          ? entry.fields.composer["en-US"]
          : []
        const desc = entry.fields.description
          ? entry.fields.description["en-US"]
          : ""
        const genres = entry.fields.genre ? entry.fields.genre["en-US"] : []
        const instruments = entry.fields.instrumentation
          ? entry.fields.instrumentation["en-US"]
          : []
        const moods = entry.fields.mood ? entry.fields.mood["en-US"] : []
        const sounds = entry.fields.soundsLike
          ? entry.fields.soundsLike["en-US"]
          : []
        const sound =
          entry.fields.audio && entry.fields.audio["en-US"].sys.id
            ? await env.getAsset(entry.fields.audio["en-US"].sys.id)
            : null
        const fileUrl = sound ? `https:${sound.fields.file["en-US"].url}` : ``
        const wave =
          entry.fields.waveformImage &&
          entry.fields.waveformImage["en-US"].sys.id
            ? await env.getAsset(entry.fields.waveformImage["en-US"].sys.id)
            : null
        const waveUrl = wave ? `https:${wave.fields.file["en-US"].url}` : ``

        setEditSongInitialValues({
          ...initialSongValues,
          title: entry.fields.title["en-US"],
          file: fileUrl,
          waveFormImage: waveUrl,
          tempo: [...tempos],
          composerValues: [...composers],
          description: desc,
          genreValues: [...genres],
          instrumentationValues: [...instruments],
          moodValues: [...moods],
          soundsLikeValues: [...sounds],
        })
      }
      seteditSongIsLoading(false)
    }
    getSong()
  }, [songId])

  return (
    <Card
      style={{
        textAlign: "center",
      }}
      className={classes.root}
    >
      <CardHeader title={songId ? "Edit A Song" : "Add A New Song"} />
      <CardContent>
        {!editSongIsLoading ? (
          <Formik
            enableReinitialize={true}
            initialValues={editSongInitialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              songId
                ? updateContentfulSong(values, actions, songId)
                : sendToContentful(values, actions)
              seteditSongIsLoading(false)
              // console.log(values)
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
              // console.log(values)
              return (
                <>
                  <Form>
                    <Category>
                      <Title>
                        <Label htmlFor="file">File</Label>
                      </Title>
                      <Field
                        name="file"
                        component={FileUpload}
                        title="Select An Audio File"
                        errorMessage={
                          errors["file"] ? errors["file"] : undefined
                        }
                        touched={touched["file"]}
                        // style={{ display: "flex" }}
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
                      label="Tempo"
                      name="tempo"
                      type="text"
                      placeholder="Enter the tempo"
                    />
                    <ArrayEntry
                      fieldName="composer"
                      fieldArrayName="composerValues"
                      setFieldValue={setFieldValue}
                      songs={songs || state.songs}
                    />
                    <SingleTextField
                      label="Description"
                      name="description"
                      type="textarea"
                      placeholder="Enter a description"
                    />
                    <ArrayEntry
                      fieldName="genre"
                      fieldArrayName="genreValues"
                      setFieldValue={setFieldValue}
                      songs={songs || state.songs}
                    />
                    <ArrayEntry
                      fieldName="mood"
                      fieldArrayName="moodValues"
                      setFieldValue={setFieldValue}
                      songs={songs || state.songs}
                    />
                    <ArrayEntry
                      fieldName="instrumentation"
                      fieldArrayName="instrumentationValues"
                      setFieldValue={setFieldValue}
                      songs={songs || state.songs}
                    />
                    <ArrayEntry
                      fieldName="soundsLike"
                      fieldArrayName="soundsLikeValues"
                      setFieldValue={setFieldValue}
                      songs={songs || state.songs}
                    />
                    <button type="submit">
                      {isSubmitting ? (
                        <>
                          <Loader
                            type="Audio"
                            color="#000"
                            height={80}
                            width={80}
                          />
                        </>
                      ) : songId ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Form>
                </>
              )
            }}
          </Formik>
        ) : (
          <Loader type="Audio" color="#000" height={80} width={80} />
        )}
      </CardContent>
    </Card>
  )
}

export default CreateOrUpdateSong
