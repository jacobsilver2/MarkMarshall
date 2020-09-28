import React from "react"
import styled from "styled-components"
import { Field, Form, Formik } from "formik"
import Loader from "react-loader-spinner"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CreateNewSong from "../components/dashboard/components/createNewSong"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Edit = ({ location }) => {
  return (
    <Wrapper>
      <CreateNewSong songId={location.state.id} />
    </Wrapper>
  )
}

export default Edit
