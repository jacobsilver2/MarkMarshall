import { Link } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import React from "react"
import styled from "styled-components"

const StyledHeader = styled.header`
  /* height: 80px; */
  grid-area: header;
  background: #0d0c1d;
  color: ${({ lightMode }) => (lightMode ? "black" : "white")};
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0 auto; */
  padding: 1.45rem 1rem;
`

const Title = styled.h1`
  /* margin: 0; */
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: #ffc600;
  }
`
const Links = styled.div`
  display: flex;
`

const Page = styled.h3`
  /* margin: auto; */
  padding-left: 1rem;
`

const Header = ({ siteTitle }) => {
  const { isLoggedIn, profile } = useAuth()
  const name = profile ? profile.name : ""

  return (
    <StyledHeader>
      <Wrapper>
        <Title>
          <StyledLink to="/">{siteTitle}</StyledLink>
        </Title>
        {isLoggedIn ? (
          <p>
            Hi, {name} <button onClick={AuthService.logout}>(logout)</button>
          </p>
        ) : null}
        <Links>
          <Page>
            <StyledLink to="/music">Music</StyledLink>
          </Page>
          <Page>
            <StyledLink to="/playlists">Playlists</StyledLink>
          </Page>
          <Page>
            <StyledLink to="/about">About</StyledLink>
          </Page>
          <Page>
            <StyledLink to="/contact">Contact</StyledLink>
          </Page>
        </Links>
      </Wrapper>
    </StyledHeader>
  )
}

export default Header
