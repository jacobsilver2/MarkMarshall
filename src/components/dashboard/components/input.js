import TextField from "@material-ui/core/TextField"
import { getIn } from "formik"
import React from "react"

const Input = ({ field, form: { errors } }) => {
  const errorMessage = getIn(errors, field.name)
  return (
    <>
      <TextField fullWidth {...field} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  )
}

export default Input
