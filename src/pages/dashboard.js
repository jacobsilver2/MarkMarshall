import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import DashboardGetSongs from "../components/dashboardGetSongs"
const Dashboard = () => {
  const { isLoggedIn, profile } = useAuth()
  return (
    <div>
      {profile && <p>Hello {profile.name}</p>}
      {isLoggedIn ? (
        <button onClick={AuthService.logout}>Logout</button>
      ) : (
        <button onClick={AuthService.login}>Login</button>
      )}
      {isLoggedIn && <DashboardGetSongs />}
    </div>
  )
}

export default Dashboard
