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
const ImageUpload = props => {
  const [uploading, setUploading] = useState(false)
  const { values, setFieldValue } = useFormikContext()

  const handleImageChange = e => {
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
    data.append("resource_type", "image")
    const res = await fetch(process.env.GATSBY_CLOUDINARY_IMAGE_UPLOAD_URL, {
      method: "POST",
      body: data,
    })
    const returnedFile = await res.json()
    setFieldValue("image", returnedFile.secure_url)
    setUploading(false)
    return returnedFile
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
            id="image-upload"
            style={{ display: "none" }}
            name={props.field.name}
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              type="file"
              name={props.field.name}
              color="primary"
              margin="normal"
              component="span"
              onChange={handleImageChange}
            >
              {props.title}
            </Button>
          </label>
          {values.image ? <img src={values.image} /> : null}
          {props.errorMessage ? (
            <FormHelperText error={true}>{props.errorMessage}</FormHelperText>
          ) : null}
        </>
      )}
    </Wrapper>
  )
}

export default ImageUpload
