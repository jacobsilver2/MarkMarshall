import React from "react"
import { useField } from "formik"
import { Category, Title, Label } from "../styles/DashboardCreateNewSong"
import toTitleCase from "../../../lib/toTitleCase"
import TextField from "@material-ui/core/TextField"

const SingleTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Category>
      <Title>
        <Label htmlFor={props.id || props.name}>{toTitleCase(label)}</Label>
      </Title>
      <TextField fullWidth {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </Category>
  )
}

export default SingleTextField
