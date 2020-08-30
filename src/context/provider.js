import React, { useReducer, createContext } from "react"

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const initialState = {
  currentTrackURL: "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
  currentTrackTitle: "Default Song",
  songs: [],
  filteredSongs: [],
  searchResults: [],
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

    case "ADD_FILTERED_SONGS": {
      return {
        ...state,
        filteredSongs: action.filteredSongs,
      }
    }
    case "ADD_FILTER": {
      const newFilteredSongs = state.filteredSongs.filter(song => {
        return (
          (song.node.genre && song.node.genre.includes(action.filter)) ||
          (song.node.composer && song.node.composer.includes(action.filter)) ||
          (song.node.tempo && song.node.tempo.includes(action.filter)) ||
          (song.node.soundsLike &&
            song.node.soundsLike.includes(action.filter)) ||
          (song.node.instrumentation &&
            song.node.instrumentation.includes(action.filter)) ||
          (song.node.mood && song.node.mood.includes(action.filter))
        )
      })
      return {
        ...state,
        filteredSongs: newFilteredSongs,
        // filteredSongs: action.filteredSongs,
      }
    }
    case "REMOVE_FILTER": {
      return {
        ...state,
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
