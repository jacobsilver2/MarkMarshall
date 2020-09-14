import React from "react"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"

const DashboardSingleTextEntry = ({ field, ...props }) => {
  const { errorMessage, touched } = props
  const { name, value, onChange, onBlur } = field

  return (
    <div>
      <TextField
        name={name}
        error={touched && errorMessage ? true : false}
        label={name}
        helperText={touched && errorMessage ? errorMessage : undefined}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default DashboardSingleTextEntry
