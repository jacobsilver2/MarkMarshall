import React from "react"
import GlobalContextProvider from "./src/context/provider"
import Layout from "./src/components/layout"
import { theme } from "./src/styles/Theme"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "./src/styles/GlobalStyle"
import Fonts from "./src/styles/Fonts"
export const wrapRootElement = ({ element, props }) => {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Fonts />
        <Layout {...props}>{element}</Layout>
      </ThemeProvider>
    </GlobalContextProvider>
  )
}
