import React from "react"
import { Field, FieldArray, useFormikContext, useField } from "formik"
import {
  Category,
  Title,
  Label,
  AddedValue,
} from "../styles/DashboardCreateNewSong"
import RankedCategory from "./rankedCategoryMemoized"
import Button from "@material-ui/core/Button"
import toTitleCase from "../../../lib/toTitleCase"
import SingleTextFieldNoStyling from "./singleTextFieldNoStyling"
import Chip from "@material-ui/core/Chip"

const ArrayEntry = ({ fieldName, fieldArrayName, setFieldValue, songs }) => {
  const { values } = useFormikContext()
  return (
    <Category>
      <Title>
        <Label htmlFor={fieldName}>{toTitleCase(fieldName)}</Label>
      </Title>
      <FieldArray name={fieldArrayName}>
        {({ push, insert, remove }) => (
          <>
            <SingleTextFieldNoStyling
              name={fieldName}
              type="text"
              placeholder={`Enter a new ${fieldName}`}
            />
            <Button
              type="button"
              disabled={!values[fieldName]}
              onClick={() => {
                values[fieldName]
                  ? push(values[fieldName])
                  : insert(0, values[fieldName])
                setFieldValue(fieldName, "")
              }}
            >{`Add ${fieldName}`}</Button>
            <AddedValue>
              {values[fieldArrayName] &&
                values[fieldArrayName].map((value, index) => (
                  // <AddedValue key={index}>
                  //   <h2 style={{ display: "inline" }}>{value}</h2>
                  //   <Button onClick={() => remove(index)}>Remove</Button>
                  // </AddedValue>
                  <Chip
                    style={{ margin: ".5rem", fontSize: "12px" }}
                    label={value}
                    key={index}
                    onDelete={() => remove(index)}
                  />
                ))}
            </AddedValue>
            <RankedCategory
              add={push}
              category={fieldName}
              arrayName={fieldArrayName}
              songs={songs}
            />
          </>
        )}
      </FieldArray>
    </Category>
  )
}

export default ArrayEntry
