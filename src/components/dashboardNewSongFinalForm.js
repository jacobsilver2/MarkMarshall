import React from "react"
import styled from "styled-components"
import validator from "validator"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import Button from "@material-ui/core/Button"
import RankedCategory from "./dashboardRankedCategoryMemo"
import { FieldArray } from "react-final-form-arrays"
import {
  TextField as MuiTextField,
  Input as MuiInput,
} from "final-form-material-ui"
import Input from "@material-ui/core/Input"

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

const NewSongFinalForm = ({ songs }) => {
  return (
    <>
      <h1>Create A New Song</h1>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={() => {}}
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
                  component={MuiTextField}
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
                  component={MuiInput}
                  fullWidth
                  placeholder="Enter a new genre"
                />
                <FieldArray name="genres">
                  {({ fields }) => {
                    return (
                      <>
                        <Button
                          disabled={!props.values.genre}
                          type="button"
                          onClick={() => {
                            fields.push(props.values.genre)
                            props.form.change("genre", "")
                          }}
                        >
                          Add
                        </Button>
                        {fields.map((name, index) => {
                          return (
                            <div key={index}>
                              <label>{props.values.genres[index]}</label>
                              <Button onClick={() => fields.remove(index)}>
                                Remove
                              </Button>
                            </div>
                          )
                        })}
                        <RankedCategory
                          category="genre"
                          songs={songs}
                          add={fields.push}
                          addedCategories={props.values.genres}
                        />
                      </>
                    )
                  }}
                </FieldArray>
              </Group>

              <Group>
                <Label>Composer</Label>
                <Field
                  name="composer"
                  type="text"
                  component={MuiInput}
                  fullWidth
                  placeholder="Enter a new composer"
                />
                <FieldArray name="composers">
                  {({ fields }) => (
                    <>
                      <Button
                        disabled={!props.values.composer}
                        onClick={() => {
                          fields.push(props.values.composer)
                          props.form.change("composer", "")
                        }}
                      >
                        Add
                      </Button>
                      {fields.map((name, index) => {
                        return (
                          <div key={index}>
                            <label>{props.values.composers[index]}</label>
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
                        addedCategories={props.values.composers}
                      />
                    </>
                  )}
                </FieldArray>
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
                <FieldArray name="instrumentation">
                  {({ fields }) => (
                    <>
                      <Button
                        disabled={!props.values.instrument}
                        onClick={() => {
                          fields.push(props.values.instrument)
                          props.form.change("instrument", "")
                        }}
                      >
                        Add
                      </Button>
                      {fields.map((name, index) => {
                        return (
                          <div key={index}>
                            <label>{props.values.instrumentation[index]}</label>
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
                        addedCategories={props.values.instrumentation}
                      />
                    </>
                  )}
                </FieldArray>
              </Group>

              <Group>
                <Label>Mood</Label>
                <Field
                  name="mood"
                  type="text"
                  fullWidth
                  component={MuiInput}
                  placeholder="Enter a new mood"
                />
                <FieldArray name="moods">
                  {({ fields }) => (
                    <>
                      <Button
                        disabled={!props.values.mood}
                        onClick={() => {
                          fields.push(props.values.mood)
                          props.form.change("mood", "")
                        }}
                      >
                        Add
                      </Button>
                      {fields.map((name, index) => {
                        return (
                          <div key={index}>
                            <label>{props.values.moods[index]}</label>
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
                        addedCategories={props.values.moods}
                      />
                    </>
                  )}
                </FieldArray>
              </Group>

              <Group>
                <Label>Sounds Like</Label>
                <Field
                  name="sound"
                  type="text"
                  fullWidth
                  component={MuiInput}
                  placeholder="Sounds Like..."
                />
                <FieldArray name="soundsLike">
                  {({ fields }) => (
                    <>
                      <Button
                        disabled={!props.values.sound}
                        onClick={() => {
                          fields.push(props.values.sound)
                          props.form.change("sound", "")
                        }}
                      >
                        Add
                      </Button>
                      {fields.map((name, index) => {
                        return (
                          <div key={index}>
                            <label>{props.values.soundsLike[index]}</label>
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
                        addedCategories={props.values.soundsLike}
                      />
                    </>
                  )}
                </FieldArray>
              </Group>

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
