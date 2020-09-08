import React, { useState } from "react"
import RankedCategory from "./dashboardRankedCategory"
import { Form, Field, ErrorMessage, Formik, FieldArray } from "formik"
import * as yup from "yup"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`
const Category = styled.div`
  border-bottom: 2px solid black;
  padding: 2rem;
  margin: 1rem;
`

const Title = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  margin: 1rem;
`

const Label = styled.label`
  text-align: left;
  padding-right: 2rem;
`

const AddedValues = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const AddedValue = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  button {
    cursor: pointer;
    margin: 0 1rem;
    border: none;
    background: none;
  }
`
const NewEntry = styled.div`
  display: grid;
  /* justify-content: center; */
  min-height: 5rem;
  grid-template-columns: 5fr 1fr;
  margin: 1rem;
  input {
    /* min-width: 500px; */
  }
  button {
    cursor: pointer;
    margin: 0 2rem;
    /* &:hover {
      color: blue;
    } */
  }
`

const validationSchema = yup.object({
  title: yup.string().required(),
  tempo: yup.number(),
  composer: yup.array(yup.string()),
  genre: yup.array(yup.string()),
  mood: yup.array(yup.string()),
  tempo: yup.number(),
  instrumentation: yup.array(yup.string()),
  soundsLike: yup.array(yup.string()),
})

const DashboardCreateNewSong = ({ songs }) => {
  const [comp, setComp] = useState("")
  const [genreField, setgenreField] = useState("")
  const [moodField, setmoodField] = useState("")
  const [instrumentationField, setInstrumentationField] = useState("")
  const [soundsLikeField, setSoundsLikeField] = useState("")

  return (
    <Wrapper>
      <h1>Add A New Song</h1>
      <Formik
        initialValues={{
          title: "",
          tempo: null,
          composer: [],
          genre: [],
          mood: [],
          soundsLike: [],
          instrumentation: [],
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, errors, touched, values }) => {
          return (
            <>
              <Form>
                <Category>
                  <Title>
                    <Label htmlFor="title">Title</Label>
                  </Title>
                  <NewEntry>
                    <Field
                      placeholder="Enter the title here"
                      name="title"
                      type="text"
                    />
                  </NewEntry>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="tempo">Tempo</Label>
                  </Title>
                  <NewEntry>
                    <Field
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
