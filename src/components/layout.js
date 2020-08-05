import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Headroom from "react-headroom"
import Header from "./Header"
import Footer from "./Footer"
import Fade from "./Fade"

const Wrapper = styled.div`
  max-width: 960;
  margin: 0 auto;
  padding: 0 1.0875rem 1.45rem;
`

const StickyFooter = styled.div`
  flex-shrink: 0;
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Headroom>
        <Header siteTitle={data.site.siteMetadata.title} />
      </Headroom>
      <Wrapper>
        <Fade location={location}>
          <main>{children}</main>
        </Fade>
      </Wrapper>
      <StickyFooter>
        <Footer />
      </StickyFooter>
    </>
  )
}

export default Layout
