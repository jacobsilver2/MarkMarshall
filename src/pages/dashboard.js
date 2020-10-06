import React, { useState, useEffect } from "react"
import { createClient } from "contentful-management"
import styled from "styled-components"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import CreateNewSong from "../components/dashboard/components/createOrUpdateSong"
import CreateNewPlaylist from "../components/dashboard/components/createOrUpdatePlaylist"

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
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const NewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  const [formSelected, setFormSelected] = useState("song")
  const [songs, setSongs] = useState([])

  useEffect(() => {
    async function getSongs() {
      const client = await createClient({
        accessToken: process.env.GATSBY_CONTENTFUL_CONTENT_MANAGEMENT,
      })
      const space = await client.getSpace(
        process.env.GATSBY_CONTENTFUL_SPACE_ID
      )
      const env = await space.getEnvironment("master")
      const entries = await env.getEntries()
      const allSongs = entries.items.filter(
        entry => entry.sys.contentType.sys.id === "song"
      )
      setSongs([...allSongs])
      return env
    }

    getSongs()
  }, [])

  const reloadData = () => {
    alert("Eventually will redeploy Netlify")
  }
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Buttons>
          <AuthWrapper>
            <div>
              {/* <div>
              {profile && (
                <img width="50px" src={profile.picture} alt={profile.name} />
              )}
            </div> */}
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
            <Container>
              <ToggleButtonGroup
                style={{ textAlign: "center" }}
                exclusive
                onChange={(e, val) => setFormSelected(val)}
                value={formSelected}
                aria-label="text alignment"
              >
                <ToggleButton value="song">Create New Song</ToggleButton>
                <ToggleButton value="playlist">
                  Create New Playlist
                </ToggleButton>
              </ToggleButtonGroup>
            </Container>
            <NewItemWrapper>
              {formSelected === "song" ? (
                <CreateNewSong songs={songs} />
              ) : (
                <CreateNewPlaylist songs={songs} />
              )}
            </NewItemWrapper>
          </>
        )}
      </ThemeProvider>
    </Wrapper>
  )
}

export default Dashboard
