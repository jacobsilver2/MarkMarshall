import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { GlobalDispatchContext, GlobalStateContext } from "../context/provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTheaterMasks,
  faGuitar,
  faUserEdit,
  faStopwatch,
  faMusic,
  faMoon,
} from "@fortawesome/free-solid-svg-icons"
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import HamburgerMenu from "react-hamburger-menu"
import "../styles/proSidebarStyles.scss"
import { sortArrayAlphabetically } from "../lib/sortArrayAlphabetically"
import tempoCalc from "../lib/tempoCalc"

const SideBarWrapper = styled.div`
  /* height: calc(100vh - 160px); */
  /* width: 270px; */
  /* max-width: 30rem; */
  scrollbar-width: none;
  /* z-index: 2; */
  /* border-right: 1px dashed black; */
`

const StyledProSideBar = styled(ProSidebar)`
  position: sticky;
  top: 0;
  /* overflow: hidden; */
  /* height: calc(100vh - 200px); */
`
const TitleAndBurgerWrapper = styled.div`
  display: flex;
  justify-content: ${({ sidebarOpen }) =>
    sidebarOpen ? "space-between" : "center"};
  align-items: center;
  padding: 1rem;
`
const Title = styled.h1`
  font-weight: bold;
  color: white;
`

const Category = styled.h2`
  display: inline;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
`
const CatWrapper = styled.div`
  height: 20vh;
  overflow: scroll;
  scrollbar-width: thin;
  overflow-x: hidden;
`
const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`
const LI = styled.li`
  margin-left: 1rem;
`

const ProSidebarComponent = () => {
  const state = useContext(GlobalStateContext)
  const data = useStaticQuery(graphql`
    query proSidebarQuery {
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
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
    setGenres(sortArrayAlphabetically(genresArr))
    setComposers(sortArrayAlphabetically(composersArr))
    setTempos(sortArrayAlphabetically(temposArr))
    setSoundsLike(sortArrayAlphabetically(soundsLikeArr))
    setInstrumentation(sortArrayAlphabetically(instrumentationArr))
    setMood(sortArrayAlphabetically(moodArr))
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
    <StyledProSideBar
      collapsed={!sidebarOpen}
      onToggle={() => setSidebarOpen(prev => !prev)}
      // width="300px"
    >
      <Menu popperArrow="true" iconShape="round">
        <SidebarHeader>
          <TitleAndBurgerWrapper sidebarOpen={sidebarOpen}>
            {sidebarOpen && <Title>Filter</Title>}
            <HamburgerMenu
              height={16}
              width={30}
              isOpen={!sidebarOpen}
              menuClicked={() => setSidebarOpen(prev => !prev)}
              color="#adadad"
            />
          </TitleAndBurgerWrapper>
        </SidebarHeader>
        <SidebarContent>
          <SubMenu
            icon={<FontAwesomeIcon icon={faTheaterMasks} />}
            title={<Category>Genre</Category>}
          >
            <CatWrapper>
              {genres.map(genre => (
                <MenuItem key={genre}>
                  <input
                    onClick={handleCheck}
                    type="checkbox"
                    name="genre"
                    value={genre}
                    defaultChecked={state.filters.includes(genre)}
                  />
                  {genre}
                </MenuItem>
              ))}
            </CatWrapper>
          </SubMenu>
          <SubMenu
            icon={<FontAwesomeIcon icon={faUserEdit} />}
            title={<Category>Composer</Category>}
          >
            {composers.map(composer => (
              <MenuItem key={composer}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="composer"
                  value={composer}
                  defaultChecked={state.filters.includes(composer)}
                />
                {composer}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu
            icon={<FontAwesomeIcon icon={faStopwatch} />}
            title={<Category>Tempo</Category>}
          >
            {tempos.map(tempo => (
              <MenuItem key={tempo}>
                <input
                  onClick={handleCheck}
                  type="checkbox"
                  name="tempo"
                  value={tempo}
                  defaultChecked={state.filters.includes(tempo)}
                />
                {tempo}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu
            icon={<FontAwesomeIcon icon={faMusic} />}
            title={<Category>Sounds Like</Category>}
          >
            <CatWrapper>
              {soundsLike.map(sound => (
                <MenuItem key={sound}>
                  <input
                    onClick={handleCheck}
                    type="checkbox"
                    name="soundsLike"
                    value={sound}
                    defaultChecked={state.filters.includes(sound)}
                  />
                  {sound}
                </MenuItem>
              ))}
            </CatWrapper>
          </SubMenu>
          <SubMenu
            icon={<FontAwesomeIcon icon={faGuitar} />}
            title={<Category>Instrumentation</Category>}
          >
            <CatWrapper>
              {instrumentation.map(inst => (
                <MenuItem key={inst}>
                  <input
                    onClick={handleCheck}
                    type="checkbox"
                    name="instrumentation"
                    value={inst}
                    checked={state.filters.includes(inst)}
                  />
                  {inst}
                </MenuItem>
              ))}
            </CatWrapper>
          </SubMenu>
          <SubMenu
            icon={<FontAwesomeIcon icon={faMoon} />}
            title={<Category>Mood</Category>}
          >
            <CatWrapper>
              {mood.map(m => (
                <MenuItem key={m}>
                  <input
                    onClick={handleCheck}
                    type="checkbox"
                    name="mood"
                    value={m}
                    checked={state.filters.includes(m)}
                  />
                  {m}
                </MenuItem>
              ))}
            </CatWrapper>
          </SubMenu>
        </SidebarContent>
      </Menu>
    </StyledProSideBar>
  )
}

export default ProSidebarComponent
