import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalDispatchContext, GlobalStateContext } from "../context/provider"

const SidebarWrapper = styled.div`
  height: calc(100vh - 160px);
  border-right: 1px dashed black;
  padding: 1rem;
  overflow: scroll;
`
const Title = styled.h1`
  font-weight: bold;
`
const Category = styled.h2`
  font-weight: bold;
  color: red;
`
const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`
const LI = styled.li`
  margin-left: 1rem;
`

const MusicSidebar = () => {
  const state = useContext(GlobalStateContext)
  const data = useStaticQuery(graphql`
    query SongsQuery {
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

  const [genres, setGenres] = useState([])
  const [composers, setComposers] = useState([])
  const [tempos, setTempos] = useState([])
  const [soundsLike, setSoundsLike] = useState([])
  const [instrumentation, setInstrumentation] = useState([])
  const [mood, setMood] = useState([])

  const dispatch = useContext(GlobalDispatchContext)

  useEffect(() => {
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
      tempo && tempo.forEach(tempo => temposSet.add(tempo))
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
    setGenres(genresArr)
    setComposers(composersArr)
    setTempos(temposArr)
    setSoundsLike(soundsLikeArr)
    setInstrumentation(instrumentationArr)
    setMood(moodArr)
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
    <SidebarWrapper>
      <Title>Filter by</Title>
      <UL>
        <li>
          <Category>Genre</Category>
          <UL>
            {genres.map(genre => (
              <LI key={genre}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="genre"
                  value={genre}
                  defaultChecked={state.filters.includes(genre)}
                />
                {genre}
              </LI>
            ))}
          </UL>
        </li>
        <li>
          <Category>Composer</Category>
          <UL>
            {composers.map(composer => (
              <LI key={composer}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="composer"
                  value={composer}
                  defaultChecked={state.filters.includes(composer)}
                />
                {composer}
              </LI>
            ))}
          </UL>
        </li>
        <li>
          <Category>Tempo</Category>
          <UL>
            {tempos.map(tempo => (
              <LI key={tempo}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="tempo"
                  value={tempo}
                  defaultChecked={state.filters.includes(tempo)}
                />
                {tempo}
              </LI>
            ))}
          </UL>
        </li>
        <li>
          <Category>Sounds Like</Category>
          <UL>
            {soundsLike.map(sound => (
              <LI key={sound}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="soundsLike"
                  value={sound}
                  defaultChecked={state.filters.includes(sound)}
                />
                {sound}
              </LI>
            ))}
          </UL>
        </li>
        <li>
          <Category>Instrumentation</Category>
          <UL>
            {instrumentation.map(inst => (
              <LI key={inst}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="instrumentation"
                  value={inst}
                  checked={state.filters.includes(inst)}
                />
                {inst}
              </LI>
            ))}
          </UL>
        </li>
        <li>
          <Category>Mood</Category>
          <UL>
            {mood.map(m => (
              <LI key={m}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="mood"
                  value={m}
                  checked={state.filters.includes(m)}
                />
                {m}
              </LI>
            ))}
          </UL>
        </li>
      </UL>
    </SidebarWrapper>
  )
}

export default MusicSidebar
