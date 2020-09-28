import React from "react"
import styled from "styled-components"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import DashboardGetSongs from "../components/dashboard/components/getSongs"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const Wrapper = styled.div`
  height: calc(100vh - 160px);
  position: relative;
  width: 100vw;
  overflow: scroll;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`
const AuthWrapper = styled.div`
  padding: 1rem;
  display: block;
  text-align: right;
`
const ResetWebsiteWrapper = styled.div`
  padding: 1rem;
  display: block;
  text-align: left;
  cursor: pointer;
`

// eventually this needs to be responsive
// https://material-ui.com/customization/typography/
const theme = createMuiTheme({
  typography: {
    fontSize: "25",
  },
})

const Dashboard = () => {
  const { isLoggedIn, profile } = useAuth()
  const reloadData = () => {
    alert("Eventually will redeploy Netlify")
  }
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Buttons>
          <AuthWrapper>
            <div>
              {profile && (
                <img width="50px" src={profile.picture} alt={profile.name} />
              )}
            </div>
            <div>
              {isLoggedIn ? (
                <Button variant="contained" onClick={AuthService.logout}>
                  Logout
                </Button>
              ) : (
                <Button variant="contained" onClick={AuthService.login}>
                  Login
                </Button>
              )}
            </div>
          </AuthWrapper>
          {isLoggedIn ? (
            <ResetWebsiteWrapper>
              <Button variant="contained" onClick={reloadData}>
                Reload Data
              </Button>
            </ResetWebsiteWrapper>
          ) : null}
        </Buttons>
        {isLoggedIn && (
          <>
            <DashboardGetSongs />
          </>
        )}
      </ThemeProvider>
    </Wrapper>
  )
}

export default Dashboard
