import React from "react"
import { Field, FieldArray } from "formik"
import {
  Category,
  Title,
  Label,
  AddedValue,
} from "../styles/DashboardCreateNewSong"
import Input from "./input"
import RankedCategory from "./rankedCategoryMemoized"
import Button from "@material-ui/core/Button"
import toTitleCase from "../../../lib/toTitleCase"

const ArrayEntry = ({
  fieldName,
  fieldArrayName,
  setFieldValue,
  values,
  songs,
}) => {
  return (
    <Category>
      <Title>
        <Label htmlFor={fieldName}>{toTitleCase(fieldName)}</Label>
      </Title>
      <FieldArray name={fieldArrayName}>
        {({ push, insert, remove }) => (
          <>
            <Field name={fieldName} component={Input} />
            <Button
              type="button"
              onClick={() => {
                values[fieldName]
                  ? push(values[fieldName])
                  : insert(0, values[fieldName])
                setFieldValue(fieldName, "")
              }}
            >{`Add ${fieldName}`}</Button>
            {values[fieldArrayName] &&
              values[fieldArrayName].map((value, index) => (
                <AddedValue key={index}>
                  <h2 style={{ display: "inline" }}>{value}</h2>
                  <Button onClick={() => remove(index)}>Remove</Button>
                </AddedValue>
              ))}
            <RankedCategory
              add={push}
              category={fieldName}
              addedCategories={values[fieldArrayName]}
              songs={songs}
            />
          </>
        )}
      </FieldArray>
    </Category>
  )
}

export default ArrayEntry
