import React from "react"
import { createClient } from "contentful-management"
import { Field, Form, Formik } from "formik"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import { Category, Label, Title } from "../styles/DashboardCreateNewSong"
import initialValues from "../lib/initialValues"
import validationSchema from "../lib/validationSchema"
import FileUpload from "./fileUpload"
import SingleTextField from "./singleTextEntry"
import ArrayEntry from "./arrayEntry"

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "1000px",
  },
}))

const DashboardCreateNewSongSecondTry = ({ songs }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title="Add A New Song" />
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            // uploadSong(values)
            console.log(values)
          }}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            resetForm,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => {
            // console.log(values)
            return (
              <>
                <Form>
                  <Category>
                    <Title>
                      <Label htmlFor="file">File</Label>
                    </Title>
                    <Field
                      name="file"
                      component={FileUpload}
                      title="Select An Audio File"
                      setFieldValue={setFieldValue}
                      errorMessage={errors["file"] ? errors["file"] : undefined}
                      touched={touched["file"]}
                      style={{ display: "flex" }}
                      onBlur={handleBlur}
                    />
                  </Category>

                  <SingleTextField
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Enter the title"
                  />
                  <SingleTextField
                    label="Tempo"
                    name="tempo"
                    type="text"
                    placeholder="Enter the tempo"
                  />
                  <ArrayEntry
                    fieldName="composer"
                    fieldArrayName="composerValues"
                    setFieldValue={setFieldValue}
                    values={values}
                    songs={songs}
                  />
                  <SingleTextField
                    label="Description"
                    name="description"
                    type="textarea"
                    placeholder="Enter a description"
                  />
                  <ArrayEntry
                    fieldName="genre"
                    fieldArrayName="genreValues"
                    setFieldValue={setFieldValue}
                    values={values}
                    songs={songs}
                  />
                  <ArrayEntry
                    fieldName="mood"
                    fieldArrayName="moodValues"
                    setFieldValue={setFieldValue}
                    values={values}
                    songs={songs}
                  />
                  <ArrayEntry
                    fieldName="instrumentation"
                    fieldArrayName="instrumentationValues"
                    setFieldValue={setFieldValue}
                    values={values}
                    songs={songs}
                  />
                  <ArrayEntry
                    fieldName="soundsLike"
                    fieldArrayName="soundsLikeValues"
                    setFieldValue={setFieldValue}
                    values={values}
                    songs={songs}
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              </>
            )
          }}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default DashboardCreateNewSongSecondTry
