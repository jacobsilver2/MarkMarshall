import React, { useState } from "react"
import Loader from "react-loader-spinner"
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
  const [uploading, setUploading] = useState(false)
  const { values, setFieldValue } = useFormikContext()

  const handleAudioChange = e => {
    e.preventDefault()
    let file = e.target.files[e.target.files.length - 1]
    if (file) {
      sendToCloudinary(file)
    }
  }

  const sendToCloudinary = async file => {
    setUploading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "mark-marshall")
    data.append("resource_type", "video")
    const res = await fetch(process.env.GATSBY_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
    const returnedFile = await res.json()
    setFieldValue("file", returnedFile.secure_url)
    setFieldValue("fileFormat", returnedFile.format)
    await getWaveformImgFromCloudinary(returnedFile.url)
    setUploading(false)
    return returnedFile
  }
  const getWaveformImgFromCloudinary = async url => {
    const newUrl = url
      .replace(
        "http://res.cloudinary.com/dplx6jxxo/video/upload/",
        "https://res.cloudinary.com/dplx6jxxo/video/upload/fl_waveform,co_grey,b_transparent/"
      )
      .replace("mp3", "png")
    const res = await fetch(newUrl)
    setFieldValue("waveFormImage", res.url)
  }
  return (
    <Wrapper>
      {uploading ? (
        <>
          <Loader type="Audio" color="#000" height={80} width={80} />
        </>
      ) : (
        <>
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
          {values.waveFormImage ? <img src={values.waveFormImage} /> : null}
          {props.errorMessage ? (
            <FormHelperText error={true}>{props.errorMessage}</FormHelperText>
          ) : null}
        </>
      )}
    </Wrapper>
  )
}
export default DashboardFileUpload
