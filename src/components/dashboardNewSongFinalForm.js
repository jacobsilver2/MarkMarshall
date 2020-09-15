import React from "react"
import styled from "styled-components"
import validator from "validator"
import { Form, Field, FormSpy } from "react-final-form"
import arrayMutators from "final-form-arrays"
import Button from "@material-ui/core/Button"
import RankedCategory from "./dashboardRankedCategory"
import { FieldArray } from "react-final-form-arrays"
import { TextField, Input as MuiInput } from "final-form-material-ui"

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1em;
`

const FormWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 0 2rem;
`

const Label = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`

const NewSongFinalForm = ({ songs, subscription }) => {
  return (
    <>
      <h1>Create A New Song</h1>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={() => {}}
        subscription={subscription}
        render={props => {
          return (
            <FormWrapper>
              <Group>
                <Label>Title</Label>
                <Field
                  name="title"
                  placeholder="title"
                  component={MuiInput}
                  fullWidth
                  validate={e =>
                    validator.isEmpty(e || "") && "Please Enter A Title"
                  }
                />
              </Group>
              <Group>
                <Label>Description</Label>
                <Field
                  name="description"
                  component={TextField}
                  type="textarea"
                  fullWidth
                  placeholder="description"
                />
              </Group>
              <Group>
                <Label>Tempo</Label>
                <Field
                  name="tempo"
                  type="number"
                  component={MuiInput}
                  fullWidth
                  placeholder="Enter the tempo"
                  validate={v =>
                    !validator.isNumeric(v || "") && "Please enter a number"
                  }
                />
              </Group>
              <Group>
                <Label>Genre</Label>
                <Field
                  name="genre"
                  type="text"
                  fullWidth
                  component={MuiInput}
                  placeholder="Enter a new genre"
                />
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => (
                    <>
                      <FieldArray name="genres">
                        {({ fields }) => {
                          return (
                            <>
                              <Button
                                onClick={() => {
                                  fields.push(values.genre)
                                  props.form.change("genre", "")
                                }}
                              >
                                Add
                              </Button>
                              {fields.map((name, index) => {
                                return (
                                  <div key={index}>
                                    <label>{values.genres[index]}</label>
                                    <Button
                                      onClick={() => fields.remove(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                )
                              })}
                              <RankedCategory
                                category="genre"
                                songs={songs}
                                add={fields.push}
                                addedCategories={values.genres}
                              />
                            </>
                          )
                        }}
                      </FieldArray>
                    </>
                  )}
                </FormSpy>
              </Group>

              <Group>
                <Label>Composer</Label>
                <Field
                  name="composer"
                  type="text"
                  fullWidth
                  component={MuiInput}
                  placeholder="Enter a new composer"
                />
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => (
                    <>
                      <FieldArray name="composers">
                        {({ fields }) => (
                          <>
                            <Button
                              onClick={() => {
                                fields.push(values.composer)
                                props.form.change("composer", "")
                              }}
                            >
                              Add
                            </Button>
                            {fields.map((name, index) => {
                              return (
                                <div key={index}>
                                  <label>{values.composers[index]}</label>
                                  <Button onClick={() => fields.remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              )
                            })}
                            <RankedCategory
                              category="composer"
                              songs={songs}
                              add={fields.push}
                              addedCategories={values.composers}
                            />
                          </>
                        )}
                      </FieldArray>
                    </>
                  )}
                </FormSpy>
              </Group>

              <Group>
                <Label>Instrumentation</Label>
                <Field
                  name="instrument"
                  type="text"
                  fullWidth
                  component={MuiInput}
                  placeholder="Enter a new instrument"
                />
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => (
                    <>
                      <FieldArray name="instrumentation">
                        {({ fields }) => (
                          <>
                            <Button
                              onClick={() => {
                                fields.push(values.instrument)
                                props.form.change("instrument", "")
                              }}
                            >
                              Add
                            </Button>
                            {fields.map((name, index) => {
                              return (
                                <div key={index}>
                                  <label>{values.instrumentation[index]}</label>
                                  <Button onClick={() => fields.remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              )
                            })}
                            <RankedCategory
                              category="instrumentation"
                              songs={songs}
                              add={fields.push}
                              addedCategories={values.instrumentation}
                            />
                          </>
                        )}
                      </FieldArray>
                    </>
                  )}
                </FormSpy>
              </Group>

              <Group>
                <Label>Mood</Label>
                <Field
                  name="mood"
                  type="text"
                  component={MuiInput}
                  fullWidth
                  placeholder="Enter a new mood"
                />
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => (
                    <>
                      <FieldArray name="moods">
                        {({ fields }) => (
                          <>
                            <Button
                              onClick={() => {
                                fields.push(values.mood)
                                props.form.change("mood", "")
                              }}
                            >
                              Add
                            </Button>
                            {fields.map((name, index) => {
                              return (
                                <div key={index}>
                                  <label>{values.moods[index]}</label>
                                  <Button onClick={() => fields.remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              )
                            })}
                            <RankedCategory
                              category="mood"
                              songs={songs}
                              add={fields.push}
                              addedCategories={values.moods}
                            />
                          </>
                        )}
                      </FieldArray>
                    </>
                  )}
                </FormSpy>
              </Group>

              {/* <Group>
              <Label>Sounds Like</Label>
              <FieldArray name="soundsLike">
                {({ fields }) => (
                  <>
                    <Field
                      name="sound"
                      type="text"
                      component={MuiInput}
                      placeholder="Sounds Like..."
                    />
                    <Button
                      onClick={() => {
                        fields.push(values.sound)
                        form.change("sound", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      return (
                        <div key={index}>
                          <label>{values.soundsLike[index]}</label>
                          <Button onClick={() => fields.remove(index)}>
                            Remove
                          </Button>
                        </div>
                      )
                    })}
                    <RankedCategory
                      category="soundsLike"
                      songs={songs}
                      add={fields.push}
                      addedCategories={values.soundsLike}
                    />
                  </>
                )}
              </FieldArray>
            </Group> */}

              <Group>
                <Button
                  type="submit"
                  disabled={
                    props.hasSubmitErrors || props.submitting || props.pristine
                  }
                >
                  Submit
                </Button>
              </Group>
            </FormWrapper>
          )
        }}
      />
    </>
  )
}

export default NewSongFinalForm
