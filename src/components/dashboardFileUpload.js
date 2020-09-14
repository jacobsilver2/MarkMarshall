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
  }

  return (
    <FormControl margin="normal">
      <input
        style={{ display: "none" }}
        name={props.field.name}
        type="file"
        onChange={handleAudioChange}
      />
      <label htmlFor="file">
        <Button color="primary" margin="normal" component="span">
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
