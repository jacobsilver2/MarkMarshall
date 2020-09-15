import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import RankedCategory from "./dashboardRankedCategoryMemo"
import {
  Form,
  ErrorMessage,
  Formik,
  FieldArray,
  Field,
  getIn,
  FastField,
} from "formik"
import * as yup from "yup"
import FileUpload from "./dashboardFileUpload"
import SingleTextEntry from "./dashboardSingleTextEntry"
import { createClient } from "contentful-management"
import Button from "@material-ui/core/Button"
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
import { Box } from "@material-ui/core"
const FILE_SIZE = 48 * 1024

const validationSchema = yup.object({
  title: yup.string().required(),
  tempo: yup.number(),
  composer: yup.string(),
  composerValues: yup.array(yup.string()),
  description: yup.string(),
  genre: yup.string(),
  genreValues: yup.array(yup.string()),
  mood: yup.string(),
  moodValues: yup.array(yup.string()),
  instrumentation: yup.string(),
  instrumentationValues: yup.array(yup.string()),
  soundsLike: yup.string(),
  soundsLikeValues: yup.array(yup.string()),
  file: yup
    .mixed()
    .required("An audio file is required")
    .test(
      "fileSize",
      "File too large",
      value => value && value.size >= FILE_SIZE
    ),
})

const Input = ({ field, form: { errors } }) => {
  const errorMessage = getIn(errors, field.name)
  return (
    <>
      <TextField {...field} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  )
}

const DashboardCreateNewSongSecondTry = ({ songs }) => {
  return (
    <Wrapper>
      <h1>Add A New Song</h1>
      <Formik
        initialValues={{
          title: "",
          tempo: 0,
          composer: "",
          composerValues: [],
          description: "",
          genre: "",
          genreValues: [],
          mood: "",
          moodValues: [],
          soundsLike: "",
          soundsLikeValues: [],
          instrumentation: "",
          instrumentationValues: [],
          file: null,
          waveFormArray: [],
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          // uploadSong(values)
          console.log(values)
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
          //   console.log(errors)
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
                    setFieldValue={setFieldValue}
                    errorMessage={errors["file"] ? errors["file"] : undefined}
                    touched={touched["file"]}
                    style={{ display: "flex" }}
                    onBlur={handleBlur}
                  />
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="title">Title</Label>
                  </Title>
                  <Field
                    name="title"
                    component={Input}
                    errorMessage={errors["text"]}
                    touched={touched["text"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="tempo">Tempo</Label>
                  </Title>
                  <Field
                    name="tempo"
                    component={SingleTextEntry}
                    errorMessage={errors["tempo"]}
                    touched={touched["tempo"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="composer">Composer</Label>
                  </Title>
                  <FieldArray name="composerValues">
                    {fieldArrayProps => (
                      <>
                        <Field name="composer" component={Input} />
                        <Button
                          type="button"
                          onClick={() => {
                            values.composer
                              ? fieldArrayProps.push(values.composer)
                              : fieldArrayProps.insert(0, values.composer)
                            setFieldValue("composer", "")
                          }}
                        >
                          Add Composer
                        </Button>
                        {values.composerValues &&
                          values.composerValues.map((comp, i) => (
                            <AddedValue key={i}>
                              <h2 style={{ display: "inline" }}>{comp}</h2>
                              <Button onClick={() => fieldArrayProps.remove(i)}>
                                Remove
                              </Button>
                            </AddedValue>
                          ))}
                        <RankedCategory
                          add={fieldArrayProps.push}
                          category="composer"
                          addedCategories={values.composerValues}
                          songs={songs}
                        />
                      </>
                    )}
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
                    <Label htmlFor="genre">Genre</Label>
                  </Title>
                  <FieldArray name="genreValues">
                    {fieldArrayProps => (
                      <>
                        <Field name="genre" component={Input} />
                        <Button
                          type="button"
                          onClick={() => {
                            values.genre
                              ? fieldArrayProps.push(values.genre)
                              : fieldArrayProps.insert(0, values.genre)
                            setFieldValue("genre", "")
                          }}
                        >
                          Add Genre
                        </Button>
                        {values.genreValues &&
                          values.genreValues.map((value, i) => (
                            <AddedValue key={i}>
                              <h2 style={{ display: "inline" }}>{value}</h2>
                              <Button onClick={() => fieldArrayProps.remove(i)}>
                                Remove
                              </Button>
                            </AddedValue>
                          ))}
                        <RankedCategory
                          add={fieldArrayProps.push}
                          category="genre"
                          addedCategories={values.genreValues}
                          songs={songs}
                        />
                      </>
                    )}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="mood">Mood</Label>
                  </Title>
                  <FieldArray name="moodValues">
                    {fieldArrayProps => (
                      <>
                        <Field name="mood" component={Input} />
                        <Button
                          type="button"
                          onClick={() => {
                            values.mood
                              ? fieldArrayProps.push(values.mood)
                              : fieldArrayProps.insert(0, values.mood)
                            setFieldValue("mood", "")
                          }}
                        >
                          Add Mood
                        </Button>
                        {values.moodValues &&
                          values.moodValues.map((value, i) => (
                            <AddedValue key={i}>
                              <h2 style={{ display: "inline" }}>{value}</h2>
                              <Button onClick={() => fieldArrayProps.remove(i)}>
                                Remove
                              </Button>
                            </AddedValue>
                          ))}
                        <RankedCategory
                          add={fieldArrayProps.push}
                          category="mood"
                          addedCategories={values.moodValues}
                          songs={songs}
                        />
                      </>
                    )}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="instrumentation">Instrumentation</Label>
                  </Title>
                  <FieldArray name="instrumentationValues">
                    {fieldArrayProps => (
                      <>
                        <Field name="instrumentation" component={Input} />
                        <Button
                          type="button"
                          onClick={() => {
                            values.instrumentation
                              ? fieldArrayProps.push(values.instrumentation)
                              : fieldArrayProps.insert(
                                  0,
                                  values.instrumentation
                                )
                            setFieldValue("instrumentation", "")
                          }}
                        >
                          Add Instrument
                        </Button>
                        {values.instrumentationValues &&
                          values.instrumentationValues.map((value, i) => (
                            <AddedValue key={i}>
                              <h2 style={{ display: "inline" }}>{value}</h2>
                              <Button onClick={() => fieldArrayProps.remove(i)}>
                                Remove
                              </Button>
                            </AddedValue>
                          ))}
                        <RankedCategory
                          add={fieldArrayProps.push}
                          category="instrumentation"
                          addedCategories={values.instrumentationValues}
                          songs={songs}
                        />
                      </>
                    )}
                  </FieldArray>
                </Category>

                <Category>
                  <Title>
                    <Label htmlFor="soundsLike">Sounds Like</Label>
                  </Title>
                  <FieldArray name="soundsLikeValues">
                    {fieldArrayProps => (
                      <>
                        <Field name="soundsLike" component={Input} />
                        <Button
                          type="button"
                          onClick={() => {
                            values.soundsLike
                              ? fieldArrayProps.push(values.soundsLike)
                              : fieldArrayProps.insert(0, values.soundsLike)
                            setFieldValue("soundsLike", "")
                          }}
                        >
                          Add Sounds Like
                        </Button>
                        {values.soundsLikeValues &&
                          values.soundsLikeValues.map((value, i) => (
                            <AddedValue key={i}>
                              <h2 style={{ display: "inline" }}>{value}</h2>
                              <Button onClick={() => fieldArrayProps.remove(i)}>
                                Remove
                              </Button>
                            </AddedValue>
                          ))}
                        <RankedCategory
                          add={fieldArrayProps.push}
                          category="soundsLike"
                          addedCategories={values.soundsLikeValues}
                          songs={songs}
                        />
                      </>
                    )}
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

export default DashboardCreateNewSongSecondTry
