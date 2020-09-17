import * as yup from "yup"

import FILE_SIZE from "./fileSize"

const validationSchema = yup.object({
  title: yup.string().required(),
  tempo: yup.number(),
  composer: yup.string(),
  composerValues: yup.array(yup.string()),
  description: yup.string(),
  genre: yup.string(),
  genreValues: yup.array(yup.string()),
  mood: yup.string(),
  moodValues: yup.array(yup.string()),
  instrumentation: yup.string(),
  instrumentationValues: yup.array(yup.string()),
  soundsLike: yup.string(),
  soundsLikeValues: yup.array(yup.string()),
  file: yup.mixed().required("An audio file is required"),
  // .test("fileSize", "File too large", value => {
  //   console.log(value)
  //   console.log(value.size)
  //   console.log(FILE_SIZE)
  //   return value && value.size >= FILE_SIZE
  // }),
})

export default validationSchema
