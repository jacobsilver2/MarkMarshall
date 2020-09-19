import React, { useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Headroom from "react-headroom"
import { GlobalDispatchContext } from "../context/provider"
import Header from "./Header"
import Footer from "./Footer"
import Fade from "./Fade"
// import "semantic-ui-css/semantic.min.css"
// import Search from "./search"

const Site = styled.div`
  height: 100vh;

  /* grid container settings */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
`
const SiteContent = styled.div`
  grid-area: main;
  overflow: auto;
`

const Layout = ({ children, location }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      songs: allContentfulSong {
        edges {
          node {
            contentful_id
            tempo
            soundsLike
            instrumentation
            audio {
              file {
                url
              }
            }
            title
            description {
              internal {
                content
              }
            }
            composer
            createdAt
            genre
            mood
          }
        }
      }
    }
  `)

  useEffect(() => {
    function addSongs() {
      dispatch({ type: "ADD_SONGS", songs: data.songs.edges })
    }
    addSongs()
  }, [])

  return (
    <Site>
      {/* <Headroom> */}
      <Header siteTitle={data.site.siteMetadata.title} />
      {/* </Headroom> */}
      <SiteContent>
        <Fade location={location}>{children}</Fade>
      </SiteContent>
      <Footer />
    </Site>
  )
}

export default Layout
