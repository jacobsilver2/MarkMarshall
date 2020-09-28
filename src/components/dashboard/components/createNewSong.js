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
import initialValues from "../lib/initialValues"
import validationSchema from "../lib/validationSchema"
import FileUpload from "./fileUpload"
import SingleTextField from "./singleTextEntry"
import ArrayEntry from "./arrayEntry"
import sendToContentful from "../lib/sendToContentful"

// this needs to be changed for responsive
const useStyles = makeStyles(theme => ({
  root: {
    width: 1000,
  },
}))

const CreateNewSong = ({ songs, songId }) => {
  const [editSongInitialValues, setEditSongInitialValues] = useState({})
  const state = useContext(GlobalStateContext)
  const classes = useStyles()

  // we will use this only when editing an existing song
  useEffect(() => {
    async function getSong() {
      const client = await createClient({
        accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
      })
      const space = await client.getSpace(
        process.env.GATSBY_CONTENTFUL_SPACE_ID
      )
      const env = await space.getEnvironment("master")
      const entry = await env.getEntry(songId)
      setEditSongInitialValues({
        ...initialValues,
        title: entry.fields.title["en-US"],
        tempo: [...entry.fields.tempo["en-US"]],
        composerValues: [...entry.fields.composer["en-US"]],
        description: entry.fields.description["en-US"],
        genreValues: [...entry.fields.genre["en-US"]],
        instrumentationValues: [...entry.fields.instrumentation["en-US"]],
        moodValues: [...entry.fields.mood["en-US"]],
        soundsLikeValues: [...entry.fields.soundsLike["en-US"]],
      })
      // setFieldValue("title", entry.fields.title["en-US"])
    }
    getSong()
  }, [songId])
  console.log(initialValues)
  console.log(editSongInitialValues)
  return (
    <Card
      style={{
        textAlign: "center",
      }}
      className={classes.root}
    >
      <CardHeader title={songId ? "Edit A Song" : "Add A New Song"} />
      <CardContent>
        <Formik
          enableReinitialize={true}
          initialValues={editSongInitialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            sendToContentful(values, actions)
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
            console.log(values)
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
                      errorMessage={errors["file"] ? errors["file"] : undefined}
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
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form>
              </>
            )
          }}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default CreateNewSong
