import React, { useContext, useState, useEffect } from "react"
import Tippy, { inlinePositioning } from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import styled from "styled-components"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useStaticQuery, graphql } from "gatsby"
import {
  faTheaterMasks,
  faGuitar,
  faUserEdit,
  faStopwatch,
  faMusic,
  faMoon,
} from "@fortawesome/free-solid-svg-icons"
import { sortArrayAlphabetically } from "../../lib/sortArrayAlphabetically"
import tempoCalc from "../../lib/tempoCalc"
import FilterCategory from "./filterCategory"

const Wrapper = styled.div`
  background-color: black;
  color: white;
  padding-top: 3rem;
`
const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
`

const UL = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
`

const Sidebar = () => {
  const dispatch = useContext(GlobalDispatchContext)

  const [catValues, setCatValues] = useState({
    genres: { label: "Genre", values: [], icon: faTheaterMasks },
    composers: { label: "Composer", values: [], icon: faUserEdit },
    tempos: { label: "Tempo", values: [], icon: faStopwatch },
    soundsLike: { label: "Sounds Like", values: [], icon: faMusic },
    instrumentation: { label: "Instrumentation", values: [], icon: faGuitar },
    mood: { label: "Mood", values: [], icon: faMoon },
  })

  const data = useStaticQuery(graphql`
    query sidebarQuery {
      songs: allContentfulSong {
        edges {
          node {
            contentful_id
            tempo
            soundsLike
            instrumentation
            audio {
              file {
                url
              }
            }
            title
            description {
              internal {
                content
              }
            }
            composer
            createdAt
            genre
            mood
          }
        }
      }
    }
  `)
  const { edges: allSongs } = data.songs

  useEffect(() => {
    function getAvailableFilterParams() {
      const genresSet = new Set()
      const composersSet = new Set()
      const temposSet = new Set()
      const soundsLikeSet = new Set()
      const instrumentationSet = new Set()
      const moodSet = new Set()

      allSongs.forEach(song => {
        const {
          genre,
          composer,
          tempo,
          soundsLike,
          instrumentation,
          mood,
        } = song.node
        genre && genre.forEach(genre => genresSet.add(genre))
        composer && composer.forEach(composer => composersSet.add(composer))
        tempo && tempo.forEach(tempo => temposSet.add(tempoCalc(tempo)))
        soundsLike && soundsLike.forEach(sound => soundsLikeSet.add(sound))
        instrumentation &&
          instrumentation.forEach(instrument =>
            instrumentationSet.add(instrument)
          )
        mood && mood.forEach(mood => moodSet.add(mood))
      })
      // all this crazy shit with sets is to get rid of duplicates
      const genresArr = [...genresSet]
      const composersArr = [...composersSet]
      const temposArr = [...temposSet]
      const soundsLikeArr = [...soundsLikeSet]
      const instrumentationArr = [...instrumentationSet]
      const moodArr = [...moodSet]
      setCatValues(prevState => ({
        ...prevState,
        genres: {
          ...prevState.genres,
          values: [...sortArrayAlphabetically(genresArr)],
        },
        composers: {
          ...prevState.composers,
          values: sortArrayAlphabetically(composersArr),
        },
        tempos: {
          ...prevState.tempos,
          values: sortArrayAlphabetically(temposArr),
        },
        soundsLike: {
          ...prevState.soundsLike,
          values: sortArrayAlphabetically(soundsLikeArr),
        },
        instrumentation: {
          ...prevState.instrumentation,
          values: sortArrayAlphabetically(instrumentationArr),
        },
        mood: { ...prevState.mood, values: sortArrayAlphabetically(moodArr) },
      }))
    }
    getAvailableFilterParams()
  }, [])

  const handleCheck = e => {
    const { value: filter, checked } = e.target
    if (checked) {
      dispatch({ type: "ADD_FILTER", filter })
    }
    if (!checked) {
      dispatch({ type: "REMOVE_FILTER", filter })
    }
  }

  return (
    <Wrapper>
      <Title>Filter</Title>
      <UL>
        {Object.keys(catValues).map(category => (
          <FilterCategory
            key={category}
            title={catValues[category].label}
            icon={catValues[category].icon}
            categoryValues={catValues[category].values}
            handleCheck={handleCheck}
          />
        ))}
      </UL>
    </Wrapper>
  )
}

export default Sidebar
