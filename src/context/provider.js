import React, { useReducer, createContext } from "react"

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const initialState = {
  currentTrackURL: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  currentTrackTitle: "Default Song",
  songs: [],
  filteredSongs: [],
  searchResults: [],
  filters: [],
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_TRACK": {
      return {
        ...state,
        currentTrackURL: action.url,
        currentTrackTitle: action.title,
      }
    }
    case "ADD_SONGS": {
      return {
        ...state,
        songs: action.songs,
      }
    }
    case "ADD_SEARCH_RESULTS": {
      return {
        ...state,
        searchResults: action.searchResults,
      }
    }

    case "ADD_FILTER": {
      return {
        ...state,
        filters: [...state.filters, action.filter],
        // filteredSongs: action.filteredSongs,
      }
    }
    case "REMOVE_FILTER": {
      return {
        ...state,
        filters: state.filters.filter(f => f !== action.filter),
      }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
