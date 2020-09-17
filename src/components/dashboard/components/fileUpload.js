import React, { useState, useEffect } from "react"
import Waveform from "./wavesWithGeneratedArray"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAudio } from "@fortawesome/free-solid-svg-icons"
import { useFormikContext } from "formik"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
`

const DashboardFileUpload = props => {
  const { values, setFieldValue } = useFormikContext()

  const handleAudioChange = e => {
    e.preventDefault()
    let file = e.target.files[0]
    if (file) {
      sendToCloudinary(file)
    }
  }

  const sendToCloudinary = async file => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "mark-marshall")
    data.append("resource_type", "video")
    const res = await fetch(process.env.GATSBY_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
    const returnedFile = await res.json()
    // console.log(returnedFile)
    setFieldValue("file", returnedFile.secure_url)
    setFieldValue("fileFormat", returnedFile.format)
    return returnedFile
  }

  return (
    <Wrapper>
      <input
        id="audio-upload"
        style={{ display: "none" }}
        name={props.field.name}
        type="file"
        onChange={handleAudioChange}
      />
      <label htmlFor="audio-upload">
        <Button
          type="file"
          onChange={handleAudioChange}
          name={props.field.name}
          color="primary"
          margin="normal"
          component="span"
        >
          {props.title}
          <FontAwesomeIcon icon={faFileAudio} />
        </Button>
      </label>

      {values.file ? <Waveform /> : null}
      {props.errorMessage ? (
        <FormHelperText error={true}>{props.errorMessage}</FormHelperText>
      ) : null}
    </Wrapper>
  )
}
export default DashboardFileUpload
