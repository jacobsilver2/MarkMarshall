import React, { useContext } from "react"
import { GlobalDispatchContext, GlobalStateContext } from "../context/provider"

const Footer = () => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  return (
    <footer>
      <p>© {new Date().getFullYear()}, built by Jacob Silver</p>
      <div>
        <button onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}>
          {state.lightMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </footer>
  )
}

export default Footer
