import React, { useState } from "react"
import Waveform from "./wavesWithGeneratedArray"
import FormControl from "@material-ui/core/FormControl"
import Button from "@material-ui/core/Button"
import FormHelperText from "@material-ui/core/FormHelperText"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAudio } from "@fortawesome/free-solid-svg-icons"

const DashboardFileUpload = props => {
  const [fileName, setFileName] = useState("")
  const [returnedFileFromCloudinary, setReturnedFileFromCloudinary] = useState()
  const [waveformArray, setWaveformArray] = useState([])

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
    setReturnedFileFromCloudinary(returnedFile)
    props.form.setFieldValue("file", returnedFile.secure_url)
    props.form.setFieldValue("waveFormArray", waveformArray)

    // returnedFileFromCloudinary &&
    //   props.form.setFieldValue("file", returnedFileFromCloudinary.secure_url)
  }

  console.log("here are the props")
  console.log(props)

  return (
    <FormControl margin="normal">
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
      {fileName ? <FormHelperText>{fileName}</FormHelperText> : null}
      {returnedFileFromCloudinary ? (
        <Waveform
          url={returnedFileFromCloudinary.secure_url}
          setArray={setWaveformArray}
        />
      ) : null}
      {props.errorMessage ? (
        <FormHelperText error={true}>{props.errorMessage}</FormHelperText>
      ) : null}
    </FormControl>
  )
}
export default DashboardFileUpload
