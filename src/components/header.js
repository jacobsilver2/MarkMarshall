import { Link } from "gatsby"
import React, { useContext } from "react"
import styled from "styled-components"
import { GlobalStateContext } from "../context/provider"

const StyledFooter = styled.footer`
  background: ${({ theme, lightMode }) =>
    lightMode ? theme.color.blue : theme.color.primaryDark};
  color: ${({ lightMode }) => (lightMode ? "black" : "white")};
  margin-bottom: 1.45rem;
`

const Title = styled.h1`
  margin: 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme, lightMode }) =>
    lightMode ? theme.color.primaryDark : theme.color.offWhite};
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ siteTitle }) => {
  const state = useContext(GlobalStateContext)
  return (
    <StyledFooter lightMode={state.lightMode}>
      <Wrapper>
        <Title>
          <StyledLink lightMode={state.lightMode} to="/">
            {siteTitle}
          </StyledLink>
        </Title>
        <p>The current mode is {state.lightMode ? "light" : "dark"}</p>
      </Wrapper>
    </StyledFooter>
  )
}

export default Header
