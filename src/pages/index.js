import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>This is Jake's default starter</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link> <br />
    </>
  )
}

export default IndexPage
