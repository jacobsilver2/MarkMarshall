import React, { useEffect, useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Headroom from "react-headroom"
import { GlobalDispatchContext } from "../context/provider"
import Header from "./Header"
import Footer from "./Footer"
import Fade from "./Fade"
import Search from "./search"

const Site = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

// const Wrapper = styled.div`
//   flex: 1 0 auto;
//   min-height: auto;
//   max-width: 960;
//   margin: 0 auto;
//   padding: 0 1.0875rem 1.45rem;
// `

const StickyFooter = styled.div`
  flex-shrink: 0;
`

const SiteContent = styled.div`
  flex-grow: 1;
  background-color: pink;
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
            bpm
            audio {
              file {
                url
              }
            }
            title
            tags
            description {
              internal {
                content
              }
            }
            composer
            createdAt
            genre
          }
        }
      }
    }
  `)

  useEffect(() => {
    dispatch({ type: "ADD_SONGS", songs: data.songs.edges })
    dispatch({ type: "ADD_FILTERED_SONGS", filteredSongs: data.songs.edges })
  }, [])

  return (
    <Site>
      <Headroom>
        <Header siteTitle={data.site.siteMetadata.title} />
      </Headroom>
      <SiteContent>
        {/* <Search /> */}
        <Fade location={location}>{children}</Fade>
      </SiteContent>
      <Footer />
    </Site>
  )
}

export default Layout
