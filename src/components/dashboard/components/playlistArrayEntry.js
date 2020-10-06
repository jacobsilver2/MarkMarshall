import React from "react"
import { FieldArray, useFormikContext, useField } from "formik"
import {
  Category,
  Title,
  Label,
  AddedValue,
} from "../styles/DashboardCreateNewSong"
import toTitleCase from "../../../lib/toTitleCase"
import Chip from "@material-ui/core/Chip"
import styled from "styled-components"
import FormHelperText from "@material-ui/core/FormHelperText"

const Wrapper = styled.div`
  position: relative;
  /* display: flex; */
  width: 100%;
  summary {
    text-align: left;
    padding: 1rem;
    cursor: pointer;
    outline: none;
  }
  /* justify-content: center; */
`

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  /* width: 100%; */
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  justify-content: center;
  max-height: 300px;
  overflow: scroll;
`

const PlaylistArrayEntry = ({ fieldArrayName, errors, songs }) => {
  const { values } = useFormikContext()
  return (
    <Category>
      <Title>
        <Label htmlFor={fieldArrayName}>{toTitleCase(fieldArrayName)}</Label>
      </Title>
      {errors ? <FormHelperText error={true}>{errors}</FormHelperText> : null}
      <FieldArray name={fieldArrayName}>
        {({ push, insert, remove }) => (
          <>
            <AddedValue>
              {values[fieldArrayName] &&
                values[fieldArrayName].map((value, index) => (
                  <Chip
                    style={{ margin: ".5rem", fontSize: "12px" }}
                    label={value.fields.title["en-US"]}
                    key={value.sys.id}
                    onDelete={() => remove(index)}
                  />
                ))}
            </AddedValue>
            <Wrapper>
              <GridWrapper>
                {songs
                  .sort((a, b) =>
                    a.fields.title["en-US"].toLowerCase() >
                    b.fields.title["en-US"].toLowerCase()
                      ? 1
                      : -1
                  )
                  .map((song, i) => (
                    <Chip
                      key={song.sys.id}
                      disabled={
                        values[fieldArrayName] &&
                        values[fieldArrayName].some(
                          value => value.sys.id === song.sys.id
                        )
                      }
                      onClick={() => push(song)}
                      color="primary"
                      label={song.fields.title["en-US"]}
                    />
                  ))}
              </GridWrapper>
            </Wrapper>
          </>
        )}
      </FieldArray>
    </Category>
  )
}

export default PlaylistArrayEntry
