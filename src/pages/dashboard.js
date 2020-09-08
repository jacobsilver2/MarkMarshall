import React from "react"
import styled from "styled-components"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import DashboardGetSongs from "../components/dashboardGetSongs"

const Wrapper = styled.div`
  height: calc(100vh - 160px);
  position: relative;
  width: 100vw;
  overflow: scroll;
`
const AuthWrapper = styled.div`
  display: block;
  text-align: right;
`

const Dashboard = () => {
  const { isLoggedIn, profile } = useAuth()
  return (
    <Wrapper>
      <AuthWrapper>
        <div>
          {profile && (
            <img width="50px" src={profile.picture} alt={profile.name} />
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={AuthService.logout}>Logout</button>
          ) : (
            <button onClick={AuthService.login}>Login</button>
          )}
        </div>
      </AuthWrapper>
      {isLoggedIn && (
        <>
          <DashboardGetSongs />
        </>
      )}
    </Wrapper>
  )
}

export default Dashboard
