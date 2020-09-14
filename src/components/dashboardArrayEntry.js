import React from "react"
import TextField from "@material-ui/core/TextField"
import { Field } from "formik"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"

const DashboardArrayEntry = ({ name, ...props }) => {
  return (
    <div>
      {props.form.values[name].map((p, i) => {
        return (
          <div key={p}>
            <TextField
              name={`${name[i]}`}
              value={p}
              onChange={props.form.handleChange}
            />
          </div>
        )
      })}
      <Button
        onClick={() => props.push({ [name]: "" })}
        color="primary"
        margin="normal"
        component="span"
      >
        Add
      </Button>
    </div>
  )
}

export default DashboardArrayEntry
