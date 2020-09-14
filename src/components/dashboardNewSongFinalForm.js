import { defaultFormat } from "moment"
import React from "react"
import styled from "styled-components"
import validator from "validator"
import { Field, FormSpy } from "react-final-form"
import { Form } from "./form"
import arrayMutators from "final-form-arrays"
import Button from "@material-ui/core/Button"
import RankedCategory from "./dashboardRankedCategory"
import { FieldArray } from "react-final-form-arrays"
import {
  TextField,
  Checkbox,
  Radio,
  Select,
  Input as MuiInput,
} from "final-form-material-ui"

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1em;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Label = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`

const NewSongFinalForm = ({ songs, subscription }) => {
  return (
    <div>
      <h1>Create A New Song</h1>
      <Form
        subscription={subscription}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={() => {}}
      >
        {finalFormProps => (
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
                placeholder="description"
              />
            </Group>
            <Group>
              <Label>Tempo</Label>
              <Field
                name="tempo"
                type="number"
                component={MuiInput}
                placeholder="Enter the tempo"
                validate={v =>
                  !validator.isNumeric(v || "") && "Please enter a number"
                }
              />
            </Group>
            <Group>
              <Label>Genre</Label>
              <FieldArray name="genres">
                {({ fields }) => (
                  <>
                    <Field
                      name="genre"
                      type="text"
                      component={MuiInput}
                      placeholder="Enter a new genre"
                    />
                    <Button
                      onClick={() => {
                        fields.push(finalFormProps.values.genre)
                        finalFormProps.form.change("genre", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      console.log(finalFormProps.values.genres)
                      return (
                        <div key={index}>
                          <label>{finalFormProps.values.genres[index]}</label>
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
                      addedCategories={finalFormProps.values.genres}
                    />
                  </>
                )}
              </FieldArray>
            </Group>

            <Group>
              <Label>Composer</Label>
              <FieldArray name="composers">
                {({ fields }) => (
                  <>
                    <Field
                      name="composer"
                      type="text"
                      component={MuiInput}
                      placeholder="Enter a new composer"
                    />
                    <Button
                      onClick={() => {
                        fields.push(finalFormProps.values.composer)
                        finalFormProps.form.change("composer", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      return (
                        <div key={index}>
                          <label>
                            {finalFormProps.values.composers[index]}
                          </label>
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
                      addedCategories={finalFormProps.values.composers}
                    />
                  </>
                )}
              </FieldArray>
            </Group>

            <Group>
              <Label>Instrumentation</Label>
              <FieldArray name="instrumentation">
                {({ fields }) => (
                  <>
                    <Field
                      name="instrument"
                      type="text"
                      component={MuiInput}
                      placeholder="Enter a new instrument"
                    />
                    <Button
                      onClick={() => {
                        fields.push(finalFormProps.values.instrument)
                        finalFormProps.form.change("instrument", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      return (
                        <div key={index}>
                          <label>
                            {finalFormProps.values.instrumentation[index]}
                          </label>
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
                      addedCategories={finalFormProps.values.instrumentation}
                    />
                  </>
                )}
              </FieldArray>
            </Group>

            <Group>
              <Label>Mood</Label>
              <FieldArray name="moods">
                {({ fields }) => (
                  <>
                    <Field
                      name="mood"
                      type="text"
                      component={MuiInput}
                      placeholder="Enter a new mood"
                    />
                    <Button
                      onClick={() => {
                        fields.push(finalFormProps.values.mood)
                        finalFormProps.form.change("mood", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      return (
                        <div key={index}>
                          <label>{finalFormProps.values.moods[index]}</label>
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
                      addedCategories={finalFormProps.values.moods}
                    />
                  </>
                )}
              </FieldArray>
            </Group>

            <Group>
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
                        fields.push(finalFormProps.values.sound)
                        finalFormProps.form.change("sound", "")
                      }}
                    >
                      Add
                    </Button>
                    {fields.map((name, index) => {
                      return (
                        <div key={index}>
                          <label>
                            {finalFormProps.values.soundsLike[index]}
                          </label>
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
                      addedCategories={finalFormProps.values.soundsLike}
                    />
                  </>
                )}
              </FieldArray>
            </Group>

            <Group>
              <Button
                type="submit"
                disabled={
                  finalFormProps.hasSubmitErrors ||
                  finalFormProps.submitting ||
                  finalFormProps.pristine
                }
              >
                Submit
              </Button>
            </Group>
          </FormWrapper>
        )}
      </Form>
    </div>
  )
}

export default NewSongFinalForm
