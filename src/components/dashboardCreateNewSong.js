import React, { useState } from "react"
import RankedCategory from "./dashboardRankedCategory"
import { Form, ErrorMessage, Formik, FieldArray } from "formik"
import * as yup from "yup"
import Waveform from "./wavesWithGeneratedArray"
// import Upload from "./dashboardUpload"
import { createClient } from "contentful-management"
import {
  Wrapper,
  Category,
  Title,
  Label,
  AddedValues,
  AddedValue,
  NewEntry,
  StyledField,
  UploadWrapper,
  SubmitButton,
} from "../styles/DashboardCreateNewSong"

const validationSchema = yup.object({
  title: yup.string().required(),
  tempo: yup.number(),
  composer: yup.array(yup.string()),
  description: yup.string(),
  genre: yup.array(yup.string()),
  mood: yup.array(yup.string()),
  instrumentation: yup.array(yup.string()),
  soundsLike: yup.array(yup.string()),
})

const DashboardCreateNewSong = ({ songs }) => {
  const [comp, setComp] = useState("")
  const [genreField, setgenreField] = useState("")
  const [moodField, setmoodField] = useState("")
  const [instrumentationField, setInstrumentationField] = useState("")
  const [soundsLikeField, setSoundsLikeField] = useState("")
  const [returnedFileFromCloudinary, setReturnedFileFromCloudinary] = useState(
    ""
  )
  const [generatedWaveformArray, setGeneratedWaveformArray] = useState([])
  // const [newSong, setNewSong] = useState({})

  const uploadSong = async values => {
    //waveformarray needs to be an array of strings. Casting here.
    const waveFormStringArray = generatedWaveformArray.map(waveform =>
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
              contentType: returnedFileFromCloudinary.format,
              fileName: values.title,
              upload: returnedFileFromCloudinary.secure_url,
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
              composer: { "en-US": [...values.composer] },
              description: { "en-US": values.description },
              instrumentation: { "en-US": [...values.instrumentation] },
              tempo: { "en-US": [values.tempo.toString()] },
              waveformarray: { "en-US": [...waveFormStringArray] },
              genre: { "en-US": [...values.genre] },
              mood: { "en-US": [...values.mood] },
              soundsLike: { "en-US": [...values.soundsLike] },
              audio: {
                "en-US": {
                  sys: { id: asset.sys.id, linkType: "Asset", type: "Link" },
                },
              },
            },
          })
          .then(entry => {
            console.log(entry)
          })
          .catch(console.error)
      })
  }

  const sendToCloudinary = async file => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "mark-marshall")
    data.append("resource_type", "video")
    const res = await fetch(process.env.GATSBY_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
    const returnedFile = await res.json()
    setReturnedFileFromCloudinary(returnedFile)
  }

  return (
    <Wrapper>
      <h1>Add A New Song</h1>
      {/* <UploadWrapper>
        <Upload setNewSong={setNewSong} />
      </UploadWrapper> */}
      <Formik
        initialValues={{
          title: "",
          tempo: 0,
          composer: [],
          description: "",
          genre: [],
          mood: [],
          soundsLike: [],
          instrumentation: [],
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          uploadSong(values)
          // console.log(values)
        }}
      >
        {({ isSubmitting, errors, touched, values, setFieldValue }) => {
          return (
            <>
              <Form>
                <SubmitButton disabled={isSubmitting || !touched} type="submit">
                  Submit
                </SubmitButton>
                <Category>
                  <Title>
                    <Label htmlFor="title">Title</Label>
                  </Title>
                  <NewEntry>
                    <StyledField
                      placeholder="Enter the title here"
                      name="title"
                      type="text"
                    />
                  </NewEntry>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="file">File</Label>
                  </Title>
                  <NewEntry>
                    <input
                      onChange={e => {
                        sendToCloudinary(e.currentTarget.files[0])
                        setFieldValue("file", e.currentTarget.files[0])
                      }}
                      placeholder="Enter the title here"
                      name="file"
                      type="file"
                    />
                  </NewEntry>
                  {returnedFileFromCloudinary && (
                    <Waveform
                      url={returnedFileFromCloudinary.secure_url}
                      setArray={setGeneratedWaveformArray}
                    />
                  )}
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="tempo">Tempo</Label>
                  </Title>
                  <NewEntry>
                    <StyledField
                      placeholder="Enter the tempo here"
                      name="tempo"
                      type="number"
                    />
                  </NewEntry>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="composer">Composer(s)</Label>
                  </Title>
                  <FieldArray name="composer">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { composer } = values
                      return (
                        <>
                          <NewEntry>
                            <input
                              placeholder="Enter A New Composer"
                              value={comp}
                              onChange={e => setComp(e.target.value)}
                              type="text"
                            />
                            <button
                              disabled={!comp}
                              type="button"
                              onClick={() => {
                                push(comp)
                                setComp("")
                              }}
                            >
                              Add New
                            </button>
                          </NewEntry>
                          <AddedValues>
                            {composer.map((comp, i) => (
                              <AddedValue key={i}>
                                <h1>{comp}</h1>
                                <button type="button" onClick={() => remove(i)}>
                                  <h1>(remove)</h1>
                                </button>
                              </AddedValue>
                            ))}
                          </AddedValues>
                          <RankedCategory
                            add={push}
                            category="composer"
                            songs={songs}
                            addedCategories={composer}
                          />
                        </>
                      )
                    }}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="description">Description</Label>
                  </Title>
                  <NewEntry>
                    <StyledField
                      placeholder="Enter a description"
                      name="description"
                      type="text"
                      as="textarea"
                    />
                  </NewEntry>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="genre">Genre(s)</Label>
                  </Title>
                  <FieldArray name="genre">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { genre } = values
                      return (
                        <>
                          <NewEntry>
                            <input
                              placeholder="Enter A New Genre"
                              value={genreField}
                              onChange={e => setgenreField(e.target.value)}
                              type="text"
                            />
                            <button
                              type="button"
                              disabled={!genreField}
                              onClick={() => {
                                push(genreField)
                                setgenreField("")
                              }}
                            >
                              Add New
                            </button>
                          </NewEntry>
                          <AddedValues>
                            {genre.map((g, i) => (
                              <AddedValue key={i}>
                                <h1>{g}</h1>
                                <button type="button" onClick={() => remove(i)}>
                                  <h1>(remove)</h1>
                                </button>
                              </AddedValue>
                            ))}
                          </AddedValues>
                          <RankedCategory
                            add={push}
                            category="genre"
                            songs={songs}
                            addedCategories={genre}
                          />
                        </>
                      )
                    }}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="instrumentation">Instrumentation</Label>
                  </Title>
                  <FieldArray name="instrumentation">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { instrumentation } = values
                      return (
                        <>
                          <NewEntry>
                            <input
                              placeholder="Enter A New Instrument"
                              value={instrumentationField}
                              onChange={e =>
                                setInstrumentationField(e.target.value)
                              }
                              type="text"
                            />
                            <button
                              type="button"
                              disabled={!instrumentationField}
                              onClick={() => {
                                push(instrumentationField)
                                setInstrumentationField("")
                              }}
                            >
                              Add New
                            </button>
                          </NewEntry>
                          <AddedValues>
                            {instrumentation.map((instrument, i) => (
                              <AddedValue key={i}>
                                <h1>{instrument}</h1>
                                <button type="button" onClick={() => remove(i)}>
                                  <h1>(remove)</h1>
                                </button>
                              </AddedValue>
                            ))}
                          </AddedValues>
                          <RankedCategory
                            add={push}
                            category="instrumentation"
                            songs={songs}
                            addedCategories={instrumentation}
                          />
                        </>
                      )
                    }}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="mood">Mood</Label>
                  </Title>
                  <FieldArray name="mood">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { mood } = values
                      return (
                        <>
                          <NewEntry>
                            <input
                              placeholder="Enter A New Mood"
                              value={moodField}
                              onChange={e => setmoodField(e.target.value)}
                              type="text"
                            />
                            <button
                              disabled={!moodField}
                              type="button"
                              onClick={() => {
                                push(moodField)
                                setmoodField("")
                              }}
                            >
                              Add New
                            </button>
                          </NewEntry>
                          <AddedValues>
                            {mood.map((m, i) => (
                              <AddedValue key={i}>
                                <h1>{m}</h1>
                                <button type="button" onClick={() => remove(i)}>
                                  <h1>(remove)</h1>
                                </button>
                              </AddedValue>
                            ))}
                          </AddedValues>
                          <RankedCategory
                            add={push}
                            category="mood"
                            songs={songs}
                            addedCategories={mood}
                          />
                        </>
                      )
                    }}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="soundsLike">Sounds Like</Label>
                  </Title>
                  <FieldArray name="soundsLike">
                    {fieldArrayProps => {
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { soundsLike } = values
                      return (
                        <>
                          <NewEntry>
                            <input
                              placeholder="Sounds Like..."
                              value={soundsLikeField}
                              onChange={e => setSoundsLikeField(e.target.value)}
                              type="text"
                            />
                            <button
                              type="button"
                              disabled={!soundsLikeField}
                              onClick={() => {
                                push(soundsLikeField)
                                setSoundsLikeField("")
                              }}
                            >
                              Add New
                            </button>
                          </NewEntry>
                          <AddedValues>
                            {soundsLike.map((sl, i) => (
                              <AddedValue key={i}>
                                <h1>{sl}</h1>
                                <button type="button" onClick={() => remove(i)}>
                                  <h1>(remove)</h1>
                                </button>
                              </AddedValue>
                            ))}
                          </AddedValues>
                          <RankedCategory
                            add={push}
                            category="soundsLike"
                            songs={songs}
                            addedCategories={soundsLike}
                          />
                        </>
                      )
                    }}
                  </FieldArray>
                </Category>
              </Form>
            </>
          )
        }}
      </Formik>
    </Wrapper>
  )
}

export default DashboardCreateNewSong
