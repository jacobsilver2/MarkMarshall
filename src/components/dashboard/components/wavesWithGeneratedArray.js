import React, { useState, useRef, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"
import { useFormikContext } from "formik"

const WaveFormWithGeneratedArray = () => {
  const waveformRef = useRef()
  const [waveSurfer, setWaveSurfer] = useState(null)
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

  useEffect(() => {
    function createWaves() {
      if (waveSurfer) {
        waveSurfer.load(values.file)
        waveSurfer.on("ready", function () {
          const length = waveSurfer.getDuration()
          const start = 0
          const end = length
          const generatedArray = waveSurfer.backend.getPeaks(length, start, end)
          setFieldValue("waveFormArray", generatedArray)
        })
      }
    }
    createWaves()
  }, [waveSurfer])

  return <div ref={waveformRef}></div>
}

export default WaveFormWithGeneratedArray
