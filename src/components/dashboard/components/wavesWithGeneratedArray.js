import React, { useState, useRef, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"
import { useFormikContext } from "formik"

const WaveFormWithGeneratedArray = () => {
  const waveformRef = useRef()
  const [waveSurfer, setWaveSurfer] = useState(null)
  const [wfImage, setWfImage] = useState("")
  const { values, setFieldValue } = useFormikContext()
  useEffect(() => {
    function setSail() {
      setWaveSurfer(
        WaveSurfer.create({
          container: waveformRef.current,
          responsive: true,
          hideScrollbar: true,
        })
      )
    }
    setSail()
  }, [values.file])

  const sendToCloudinary = async image => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "mark-marshall")
    // data.append("resource_type", "auto")
    console.log("attempting to upload base 64 image to cloudinary")
    console.log("here is the base 64 image")
    console.log(image)
    const res = await fetch(process.env.GATSBY_CLOUDINARY_IMAGE_URL, {
      method: "POST",
      body: data,
    })
    const returnedFile = await res.json()
    console.log(returnedFile)
    // setCloudFile(returnedFile)
    // setFieldValue("file", returnedFile.secure_url)
    // setFieldValue("fileFormat", returnedFile.format)
    // return returnedFile
  }

  useEffect(() => {
    async function createWaves() {
      if (waveSurfer) {
        waveSurfer.load(values.file)
        waveSurfer.on("ready", async function () {
          const length = waveSurfer.getDuration()
          const start = 0
          const end = length
          const generatedArray = waveSurfer.backend.getPeaks(length, start, end)
          const waveFormImage = waveSurfer.exportImage()
          // setWfImage(waveFormImage)
          setFieldValue("waveFormImage", waveFormImage)
          setFieldValue("waveFormArray", generatedArray)
        })
      }
    }
    createWaves()
  }, [waveSurfer])

  // useEffect(() => {
  //   async function sendToCl() {
  //     console.log("here is the returned file")
  //     console.log(values.waveFormImage)
  //     const data = new FormData()
  //     data.append("file", values.waveFormImage)
  //     data.append("upload_preset", "mark-marshall")
  //     // data.append("resource_type", "image")
  //     const res = await fetch(process.env.GATSBY_CLOUDINARY_IMAGE_URL, {
  //       method: "POST",
  //       headers: {
  //         "Cache-Control": "no-cache",
  //       },
  //       processData: false,
  //       contentType: false,
  //       mimeType: "multipart/form-data",
  //       body: data,
  //     })
  //     // const returnedFile = await res.json()
  //     const returnedFile = await res
  //     console.log(returnedFile)
  //   }
  //   sendToCl()
  // }, [values.waveFormImage])

  return <div ref={waveformRef}></div>
}

export default WaveFormWithGeneratedArray
