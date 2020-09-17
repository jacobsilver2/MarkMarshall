import React from "react"
import { useField } from "formik"
import { Category, Title, Label } from "../styles/DashboardCreateNewSong"
import toTitleCase from "../../../lib/toTitleCase"
import TextField from "@material-ui/core/TextField"

const SingleTextField = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <TextField fullWidth {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  )
}

export default SingleTextField
