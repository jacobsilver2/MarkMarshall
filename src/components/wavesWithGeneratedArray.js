import React, { useState, useRef, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"

const WaveFormWithGeneratedArray = ({ url, setArray }) => {
  const waveformRef = useRef()
  const [waveSurfer, setWaveSurfer] = useState(null)

  useEffect(() => {
    setWaveSurfer(
      WaveSurfer.create({
        container: waveformRef.current,
        responsive: true,
        hideScrollbar: true,
      })
    )
  }, [url])

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.load(url)
      waveSurfer.on("ready", function () {
        const length = waveSurfer.getDuration()
        const start = 0
        const end = length
        const generatedArray = waveSurfer.backend.getPeaks(length, start, end)
        console.log(generatedArray)
        setArray(generatedArray)
      })
    }
  }, [waveSurfer])

  return <div ref={waveformRef}></div>
}

export default WaveFormWithGeneratedArray
