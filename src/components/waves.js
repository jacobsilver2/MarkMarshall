// import React, { useCallback, useRef, useContext, useEffect } from "react"
// import { WaveSurfer, WaveForm } from "wavesurfer-react"
// import { GlobalStateContext } from "../context/provider"
// import { WaveformContainer, Wave, PlayButton } from "../styles/WaveformStyles"

// const WavesurfertakeThree = ({ url }) => {
//   const state = useContext(GlobalStateContext)
//   const wavesurferRef = useRef()

//   const handleWSMount = useCallback(
//     waveSurfer => {
//       console.log("here")
//       wavesurferRef.current = waveSurfer
//       if (wavesurferRef.current) {
//         wavesurferRef.current.load(url)

//         wavesurferRef.current.on("ready", () => {
//           console.log("WaveSurfer is ready")
//         })

//         wavesurferRef.current.on("loading", data => {
//           console.log("loading --> ", data)
//         })

//         if (window) {
//           window.surferidze = wavesurferRef.current
//         }
//       }
//     },
//     [url]
//   )

//   const { waveSurfer } = handleWSMount
//   console.log(waveSurfer)
//   useEffect(() => {
//     // waveSurfer()
//   }, [waveSurfer])

//   const play = useCallback(() => {
//     wavesurferRef.current.playPause()
//   }, [])
//   return (
//     <WaveformContainer>
//       <PlayButton onClick={play}>Play/Pause</PlayButton>
//       <Wave>
//         <WaveSurfer onMount={handleWSMount}>
//           <WaveForm></WaveForm>
//         </WaveSurfer>
//       </Wave>
//     </WaveformContainer>
//   )
// }

// export default WavesurfertakeThree
