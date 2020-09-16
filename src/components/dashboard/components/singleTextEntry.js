import React from "react"
import { Field } from "formik"
import { Category, Title, Label } from "../styles/DashboardCreateNewSong"
import Input from "./input"
import toTitleCase from "../../../lib/toTitleCase"

const DashboardSingleTextEntry = ({ name, errors, touched, onBlur }) => {
  return (
    <Category>
      <Title>
        <Label htmlFor={name}>{toTitleCase(name)}</Label>
      </Title>
      <Field
        name={name}
        component={Input}
        touched={touched[name]}
        errorMessage={errors[name]}
        onBlur={onBlur}
      />
    </Category>
  )
}

export default DashboardSingleTextEntry
